import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from './data/terra-suggestion-box.interface';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
    isNull,
    isNullOrUndefined
} from 'util';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';
import { TerraBaseData } from '../../data/terra-base.data';

const MAX_LASTLY_USED_ENTRIES:number = 5;

@Component({
    selector:  'terra-suggestion-box',
    styles:    [require('./terra-suggestion-box.component.scss')],
    template:  require('./terra-suggestion-box.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraSuggestionBoxComponent),
            multi:       true
        }
    ]
})
export class TerraSuggestionBoxComponent implements OnInit, OnChanges, ControlValueAccessor
{
    @Input()
    public inputName:string;

    @Input()
    public inputIsRequired:boolean;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputTooltipText:string;

    @Input()
    public inputTooltipPlacement:TerraPlacementEnum = TerraPlacementEnum.TOP;

    @Input()
    public inputListBoxValues:Array<TerraSuggestionBoxValueInterface> = [];

    @Input()
    public inputWithRecentlyUsed:boolean;

    /**
     * @deprecated since it notifies the user at exactly the same time as ngModelChange <-> onChangeCallback
     */
    @Output()
    public outputValueChanged:EventEmitter<TerraSuggestionBoxValueInterface> = new EventEmitter<TerraSuggestionBoxValueInterface>();

    @Output()
    public outputClicked:EventEmitter<Event> = new EventEmitter<Event>();

    @Output()
    public textInputValueChange:EventEmitter<string> = new EventEmitter<string>();

    public isValid:boolean = true;

    protected displayListBoxValues:Array<TerraSuggestionBoxValueInterface> = [];
    protected lastSelectedValues:Array<TerraSuggestionBoxValueInterface> = [];
    protected listBoxHeadingKey:string = '';
    protected noEntriesTextKey:string;
    protected _selectedValue:TerraSuggestionBoxValueInterface = null;
    protected tmpSelectedValue:TerraSuggestionBoxValueInterface = null;
    protected _textInputValue:string = '';
    protected _toggleOpen:boolean = false;

    private hasLabel:boolean;

    private clickListener:(event:Event) => void;

    @ViewChildren('renderedListBoxValues')
    private renderedListBoxValues:QueryList<ElementRef>;

    constructor(private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        this.clickListener = (event:Event):void =>
        {
            this.clickedOutside(event);
        };

        this.inputTooltipPlacement = TerraPlacementEnum.TOP;
        this.tmpSelectedValue = null;

        this.isValid = true;
        this._toggleOpen = false;
        this.hasLabel = !isNull(this.inputName);
        this.lastSelectedValues = [];
        this.listBoxHeadingKey = '';
        this.noEntriesTextKey = this.inputWithRecentlyUsed ? 'terraSuggestionBox.noRecentlyUsed' : 'terraSuggestionBox.noSuggestions';

        if(!this.inputWithRecentlyUsed)
        {
            // initialize the displayed list with all possible values
            this.displayListBoxValues = this.inputListBoxValues;
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['inputListBoxValues'])
        {
            this.displayListBoxValues = this.inputListBoxValues;
            if(changes['inputListBoxValues'].currentValue.length > 0 &&
                !isNullOrUndefined(this.selectedValue) &&
                !this.inputListBoxValues.find((x:TerraSuggestionBoxValueInterface):boolean => this.selectedValue.value === x.value))
            {
                // reset selected value if the value does not exists or the list is empty
                this.selectedValue = null;
            }
        }
    }

    public registerOnChange(fn:(_:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;

    public writeValue(value:any):void
    {
        this.value = value;
    }

    public get value():number | string | TerraBaseData
    {
        return !isNullOrUndefined(this.selectedValue) ? this.selectedValue.value : null;
    }

    public set value(value:number | string | TerraBaseData)
    {
        if(isNullOrUndefined(this.inputListBoxValues) || isNullOrUndefined(value))
        {
            this.selectedValue = null;
        }
        else
        {
            this.selectedValue = this.inputListBoxValues.find((item:TerraSuggestionBoxValueInterface) => item.value === value);
        }

        this.tmpSelectedValue = this.selectedValue;
    }

    protected onClick(evt:Event):void
    {
        evt.stopPropagation(); // prevents the click listener on the document to be fired right after
        this.toggleOpen = !this.toggleOpen;
    }

    public set toggleOpen(value:boolean)
    {
        if(this._toggleOpen !== value && value === true)
        {
            document.addEventListener('click', this.clickListener, true);
            this.focusSelectedElement();
        }
        else if(this._toggleOpen !== value && value === false)
        {
            document.removeEventListener('click', this.clickListener);
        }

        this._toggleOpen = value;
    }

    public get toggleOpen():boolean
    {
        return this._toggleOpen;
    }

    private clickedOutside(event:Event):void
    {
        if(!this.elementRef.nativeElement.contains(event.target))
        {
            this.toggleOpen = false;
        }
    }

    private select(value:TerraSuggestionBoxValueInterface):void
    {
        // check if value is available
        if(!this.displayListBoxValues.find((elem:TerraSuggestionBoxValueInterface):boolean => elem === value))
        {
            return;
        }

        // update selected value
        this.selectedValue = value;

        // update last selected values
        if(this.inputWithRecentlyUsed)
        {
            this.updateLastSelectedValues();
        }

        // update temp selected value
        this.tmpSelectedValue = this.selectedValue;

        // execute callback functions
        this.onTouchedCallback();
        this.onChangeCallback(value.value);
        this.outputValueChanged.emit(value);
    }

    private updateLastSelectedValues():void
    {
        // check if newly selected value has been selected lastly
        let valueSelected:TerraSuggestionBoxValueInterface =
            this.lastSelectedValues.find((value:TerraSuggestionBoxValueInterface) =>
                value.caption === this.selectedValue.caption &&
                value.value === this.selectedValue.value
            );

        // add value to the last selected values, if it is not already added
        if(isNullOrUndefined(valueSelected))
        {
            let length:number = this.lastSelectedValues.unshift(
                {
                    caption: this.selectedValue.caption,
                    value:   this.selectedValue.value
                }
            );

            // check if length of the array exceeds the maximum amount of "lastly used" entries
            if(length > MAX_LASTLY_USED_ENTRIES)
            {
                // remove last element of the array
                this.lastSelectedValues.pop();
            }
        }
    }

    public onChange():void
    {
        let searchString:any = this.textInputValue;
        this.toggleOpen = true;

        if(!isNullOrUndefined(searchString) && searchString.length >= 3)
        {
            this.listBoxHeadingKey = 'terraSuggestionBox.suggestions';
            this.noEntriesTextKey = 'terraSuggestionBox.noSuggestions';
            if(!isNullOrUndefined(this.inputListBoxValues))
            {
                this.displayListBoxValues = this.inputListBoxValues.filter((value:TerraSuggestionBoxValueInterface) =>
                {
                    // check if search string has a full match
                    if(value.caption.toUpperCase().includes(searchString.toUpperCase()))
                    {
                        return true;
                    }

                    // search for partial strings
                    let searchStringIncluded:boolean = true;
                    searchString.split(' ').forEach((word:string) =>
                    {
                        searchStringIncluded = searchStringIncluded && value.caption.toUpperCase().includes(word.toUpperCase());
                    });
                    return searchStringIncluded;
                });
            }
        }
        else if(this.inputWithRecentlyUsed)
        {
            this.listBoxHeadingKey = 'terraSuggestionBox.recentlyUsed';
            this.noEntriesTextKey = 'terraSuggestionBox.noRecentlyUsed';
            this.displayListBoxValues = this.lastSelectedValues;
        }
        else if(!isNullOrUndefined(this.inputListBoxValues))
        {
            this.displayListBoxValues = this.inputListBoxValues;
        }

        // update selected value
        this.setSelectedValue(this.displayListBoxValues.find((val:TerraSuggestionBoxValueInterface) => val.caption === searchString), true);
    }

    /**
     * @deprecated use ngModel instead to reset the selected value
     */
    public resetComponentValue():void
    {
        this.value = null;

        this.selectedValue = null;

        this.tmpSelectedValue = null;
    }

    protected onKeyDown(event:KeyboardEvent):void
    {
        // check if one of the dedicated keys has been pressed
        if(!(event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === 'Escape'))
        {
            return;
        }

        // check if there is any selected value yet
        if(isNullOrUndefined(this.tmpSelectedValue))
        {
            this.tmpSelectedValue = this.displayListBoxValues[0];
        }
        else
        {
            // get the array index of the selected value
            let index:number = this.displayListBoxValues.findIndex((item:TerraSuggestionBoxValueInterface) =>
                item.value === this.tmpSelectedValue.value
            );

            // check if element has been found
            if(index >= 0)
            {
                // determine the key, that has been pressed
                switch(event.key)
                {
                    case 'ArrowDown': // mark the succeeding list element
                        if(index + 1 < this.displayListBoxValues.length)
                        {
                            // open dropdown if not already opened
                            if(!this.toggleOpen)
                            {
                                this.toggleOpen = true;
                            }
                            // mark next element for selection
                            this.tmpSelectedValue = this.displayListBoxValues[index + 1];
                            // adjust scrolling viewport
                            this.focusSelectedElement();
                        }
                        break;
                    case 'ArrowUp': // mark the preceding list element
                        if(index - 1 >= 0)
                        {
                            // open dropdown if not already opened
                            if(!this.toggleOpen)
                            {
                                this.toggleOpen = true;
                            }
                            // mark previous element for selection
                            this.tmpSelectedValue = this.displayListBoxValues[index - 1];
                            // adjust scrolling viewport
                            this.focusSelectedElement();
                        }
                        break;
                    case 'Enter': // select the marked element
                        // check if element is really available
                        if(this.displayListBoxValues.find((item:TerraSuggestionBoxValueInterface) => item === this.tmpSelectedValue))
                        {
                            this.select(this.tmpSelectedValue); // select the chosen element
                            this.toggleOpen = false; // close the dropdown
                        }
                        break;
                    case 'Escape': // close the dropdown
                        this.toggleOpen = false; // close the dropdown
                        break;
                }
            }
            else
            {
                this.tmpSelectedValue = this.displayListBoxValues[0];
            }
        }

        // stop event bubbling
        event.stopPropagation();
    }

    private focusSelectedElement():void
    {
        // get the temporary selected DOM element
        const selectedElementRef:ElementRef = this.renderedListBoxValues.find((value:ElementRef) =>
        {
            return value.nativeElement.classList.contains('selected');
        });

        // check if the element has been found
        if(selectedElementRef)
        {
            const spanElement:HTMLSpanElement = selectedElementRef.nativeElement;

            // scroll to the selected element
            spanElement.parentElement.scrollTop = spanElement.offsetTop - spanElement.parentElement.offsetTop;
        }
    }

    /**
     * workaround to prevent calling the select() method on the label click
     * @param event
     */
    protected onInputClick(event:any):void
    {
        this.outputClicked.emit(event);

        // check if the input has been clicked
        if(event.target.nodeName === 'INPUT')
        {
            // select the input text <-> mark all
            event.target.select();
        }
    }

    protected get textInputValue():string
    {
        return this._textInputValue;
    }

    protected set textInputValue(value:string)
    {
        if(this._textInputValue !== value)
        {
            this.textInputValueChange.emit(value);
        }
        this._textInputValue = value;
    }

    public set selectedValue(value:TerraSuggestionBoxValueInterface)
    {
        this.setSelectedValue(value);
    }

    private setSelectedValue(value:TerraSuggestionBoxValueInterface, onChange?:boolean):void
    {
        // does not do anything if the value changes from undefined to null or reverse
        if(isNullOrUndefined(this._selectedValue) && isNullOrUndefined(value))
        {
            return;
        }
        // the value has changed?
        if(this._selectedValue !== value)
        {
            // update local model
            this._selectedValue = value;
            this.tmpSelectedValue = this._selectedValue;

            // execute callback functions
            this.onTouchedCallback(); // this may be called when the text input value changes instead!?
            this.onChangeCallback(this.value);
            this.outputValueChanged.emit(this._selectedValue);

            // finally update text input value
            if(!onChange)
            {
                this.textInputValue = !isNullOrUndefined(this._selectedValue) ? this._selectedValue.caption : '';
            }
        }
    }

    public get selectedValue():TerraSuggestionBoxValueInterface
    {
        return this._selectedValue;
    }
}
