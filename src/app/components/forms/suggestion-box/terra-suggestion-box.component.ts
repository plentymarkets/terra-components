import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
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
    public inputTooltipPlacement:TerraPlacementEnum;

    @Input()
    public inputListBoxValues:Array<TerraSuggestionBoxValueInterface>;

    @Input()
    public inputWithRecentlyUsed:boolean;

    @Output()
    public outputValueChanged:EventEmitter<TerraSuggestionBoxValueInterface> = new EventEmitter<TerraSuggestionBoxValueInterface>();

    @Output()
    public outputClicked:EventEmitter<Event> = new EventEmitter<Event>();

    public isValid:boolean;
    public selectedValue:TerraSuggestionBoxValueInterface;

    protected _displayListBoxValues:Array<TerraSuggestionBoxValueInterface> = [];
    protected _lastSelectedValues:Array<TerraSuggestionBoxValueInterface>;
    protected _listBoxHeadingKey:string;
    protected _noEntriesTextKey:string;

    private _tmpSelectedValue:TerraSuggestionBoxValueInterface;
    private _toggleOpen:boolean;
    private _hasLabel:boolean;
    private _value:number | string | TerraBaseData;
    private clickListener:(event:Event) => void;

    constructor(private _elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        this.clickListener = (event:Event):void =>
        {
            this.clickedOutside(event);
        };

        this.inputTooltipPlacement = TerraPlacementEnum.TOP;
        this.selectedValue =
            {
                value:   '',
                caption: ''
            };
        this._tmpSelectedValue = null;

        this.isValid = true;
        this._toggleOpen = false;
        this._hasLabel = !isNull(this.inputName);
        this._lastSelectedValues = [];
        this._listBoxHeadingKey = '';
        this._noEntriesTextKey = this.inputWithRecentlyUsed ? 'terraSuggestionBox.noRecentlyUsed' : 'terraSuggestionBox.noSuggestions';

        if(!this.inputWithRecentlyUsed)
        {
            // initialize the displayed list with all possible values
            this._displayListBoxValues = this.inputListBoxValues;
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['inputListBoxValues']
           && changes['inputListBoxValues'].currentValue.length > 0
           && !this.inputListBoxValues.find((x:TerraSuggestionBoxValueInterface):boolean => this.selectedValue === x))
        {
            this.select(this.inputListBoxValues[0]);
        }
        if(changes['inputListBoxValues'])
        {
            this._displayListBoxValues = this.inputListBoxValues;
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
        return this._value;
    }

    public set value(value:number | string | TerraBaseData)
    {
        this._value = value;

        if(!isNullOrUndefined(value))
        {
            let selectedValue:TerraSuggestionBoxValueInterface =
                this.inputListBoxValues.find((item:TerraSuggestionBoxValueInterface) => item.value === value);

            if(selectedValue)
            {
                this.selectedValue = {
                    caption: selectedValue.caption,
                    value:   selectedValue.value
                };
            }
        }
        else if(!isNullOrUndefined(this.inputListBoxValues) &&  this.inputListBoxValues.length)
        {
            this.selectedValue = {
                caption: this.inputListBoxValues[0].caption,
                value:   this.inputListBoxValues[0].value
            };
        }

        this._tmpSelectedValue = this.selectedValue;
    }

    private onClick(evt:Event):void
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
        if(!this._elementRef.nativeElement.contains(event.target))
        {
            this.toggleOpen = false;
        }
    }

    private select(value:TerraSuggestionBoxValueInterface):void
    {
        // check if value is available
        if(!this._displayListBoxValues.find((elem:TerraSuggestionBoxValueInterface):boolean => elem === value))
        {
            return;
        }

        // update selected value
        this.selectedValue = {
            caption: value.caption,
            value:   value.value
        };

        // update last selected values
        if(this.inputWithRecentlyUsed)
        {
            this.updateLastSelectedValues();
        }

        // update temp selected value
        this._tmpSelectedValue = this.selectedValue;

        // execute callback functions
        this.onTouchedCallback();
        this.onChangeCallback(value.value);
        this.outputValueChanged.emit(value);
    }

    private updateLastSelectedValues():void
    {
        // check if newly selected value has been selected lastly
        let valueSelected:TerraSuggestionBoxValueInterface =
            this._lastSelectedValues.find((value:TerraSuggestionBoxValueInterface) =>
                value.caption === this.selectedValue.caption &&
                value.value === this.selectedValue.value
            );

        // add value to the last selected values, if it is not already added
        if(isNullOrUndefined(valueSelected))
        {
            let length:number = this._lastSelectedValues.unshift(
                {
                    caption: this.selectedValue.caption,
                    value:   this.selectedValue.value
                }
            );

            // check if length of the array exceeds the maximum amount of "lastly used" entries
            if(length > MAX_LASTLY_USED_ENTRIES)
            {
                // remove last element of the array
                this._lastSelectedValues.pop();
            }
        }
    }

    public onChange():void
    {
        let searchString:any = this.selectedValue.caption;
        this.toggleOpen = true;

        if(searchString.length >= 3)
        {
            this._listBoxHeadingKey = 'terraSuggestionBox.suggestions';
            this._noEntriesTextKey = 'terraSuggestionBox.noSuggestions';
            this._displayListBoxValues = this.inputListBoxValues.filter((value:TerraSuggestionBoxValueInterface) =>
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
        else if(this.inputWithRecentlyUsed)
        {
            this._listBoxHeadingKey = 'terraSuggestionBox.recentlyUsed';
            this._noEntriesTextKey = 'terraSuggestionBox.noRecentlyUsed';
            this._displayListBoxValues = this._lastSelectedValues;
        }
        else
        {
            this._displayListBoxValues = this.inputListBoxValues;
        }

        this.value = this.selectedValue.value;
    }

    public resetComponentValue():void
    {
        this.value = null;

        this.selectedValue =
            {
                value:   '',
                caption: ''
            };

        this._tmpSelectedValue = null;
    }

    private onKeyDown(event:KeyboardEvent):void
    {
        // check if one of the dedicated keys has been pressed
        if(!(event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === 'Escape'))
        {
            return;
        }

        // check if there is any selected value yet
        if(isNullOrUndefined(this._tmpSelectedValue))
        {
            this._tmpSelectedValue = this._displayListBoxValues[0];
        }
        else
        {
            // get the array index of the selected value
            let index:number = this._displayListBoxValues.findIndex((item:TerraSuggestionBoxValueInterface) =>
                item.value === this._tmpSelectedValue.value
            );

            // check if element has been found
            if(index >= 0)
            {
                // determine the key, that has been pressed
                switch(event.key)
                {
                    case 'ArrowDown': // mark the succeeding list element
                        if(index + 1 < this._displayListBoxValues.length)
                        {
                            // open dropdown if not already opened
                            if(!this.toggleOpen)
                            {
                                this.toggleOpen = true;
                            }
                            // mark next element for selection
                            this._tmpSelectedValue = this._displayListBoxValues[index + 1];
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
                            this._tmpSelectedValue = this._displayListBoxValues[index - 1];
                            // adjust scrolling viewport
                            this.focusSelectedElement();
                        }
                        break;
                    case 'Enter': // select the marked element
                        // check if element is really available
                        if(this._displayListBoxValues.find((item:TerraSuggestionBoxValueInterface) => item === this._tmpSelectedValue))
                        {
                            this.select(this._tmpSelectedValue); // select the chosen element
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
                this._tmpSelectedValue = this._displayListBoxValues[0];
            }
        }

        // stop event bubbling
        event.stopPropagation();
    }

    private focusSelectedElement():void
    {
        // get the temporary selected DOM element
        let selectedElement:HTMLElement = $('.select-box-dropdown > span.selected').get().pop();

        // check if the element has been found
        if(selectedElement)
        {
            // scroll to the selected element
            selectedElement.parentElement.scrollTop = selectedElement.offsetTop - selectedElement.parentElement.offsetTop;
        }
    }

    /**
     * workaround to prevent calling the select() method on the label click
     * @param event
     */
    private onInputClick(event:any):void
    {
        this.outputClicked.emit(event);

        // check if the input has been clicked
        if(event.target.nodeName === 'INPUT')
        {
            // select the input text <-> mark all
            event.target.select();
        }
    }
}
