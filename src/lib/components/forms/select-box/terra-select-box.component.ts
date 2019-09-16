import {
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
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';
import {
    FormControl,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { StringHelper } from '../../../helpers/string.helper';
import { noop } from 'rxjs';
import { SelectBoxSortHelper } from '../../../helpers/select-box-sort.helper';
import { SortDirectionEnum } from '../../../helpers/enums/sort-direction.enum';

@Component({
    selector:  'terra-select-box',
    styles:    [require('./terra-select-box.component.scss')],
    template:  require('./terra-select-box.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraSelectBoxComponent),
            multi:       true
        }
    ]
})
/**
 * @deprecated since v4. Use '<mat-select>' instead. See {@link https://material.angular.io/components/select/overview}
 */
export class TerraSelectBoxComponent implements OnInit, OnChanges
{
    @Input()
    public inputName:string = ' ';

    @Input()
    public inputIsRequired:boolean;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputIsSmall:boolean;

    @Input()
    public inputOpenOnTop:boolean;

    @Input()
    public inputTooltipText:string;

    /**
     * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
     */
    @Input()
    public inputTooltipPlacement:string;

    @Input()
    public inputListBoxValues:Array<TerraSelectBoxValueInterface>;

    @Input()
    public disableSorting:boolean = false;

    @Input()
    public sortDirection:SortDirectionEnum = 'asc';

    /**
     * @deprecated use ngModelChange instead
     */
    @Output()
    public inputSelectedValueChange:EventEmitter<TerraSelectBoxValueInterface> = new EventEmitter<TerraSelectBoxValueInterface>();

    public isValid:boolean;

    protected selectedValue:TerraSelectBoxValueInterface;
    protected tmpSelectedValue:TerraSelectBoxValueInterface;
    protected hasLabel:boolean;

    private _value:number | string;
    private _toggleOpen:boolean;
    private isInit:boolean;
    private clickListener:(event:Event) => void;

    @ViewChildren('renderedListBoxValues')
    private renderedListBoxValues:QueryList<ElementRef>;

    /**
     *
     * Two way data binding by ngModel
     */
    private onTouchedCallback:() => void = noop;
    private onChangeCallback:(_:any) => void = noop;

    /**
     * @deprecated use ngModel instead
     */
    public get inputSelectedValue():number | string
    {
        return this.selectedValue.value;
    }

    /**
     *
     * @param elementRef
     */
    constructor(private elementRef:ElementRef)
    {
        this.clickListener = (event:Event):void =>
        {
            this.clickedOutside(event);
        };

        this.isInit = false;
        this.inputIsSmall = false;
        this.inputOpenOnTop = false;
    }

    public ngOnInit():void
    {
        this.isValid = true;
        this._toggleOpen = false;
        this.hasLabel = !StringHelper.isNullUndefinedOrEmpty(this.inputName);
        this.isInit = true;
    }

    /**
     *
     * @param changes
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        if(this.isInit === true
           && changes['inputListBoxValues']
           && changes['inputListBoxValues'].currentValue.length > 0
           && !this.inputListBoxValues.find((x:TerraSelectBoxValueInterface):boolean => this.selectedValue === x))
        {
            this.select(this.inputListBoxValues[0]);
        }

        if(changes['sortDirection'] || changes['inputListBoxValues'])
        {
            this.sortListBoxValues();
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

    public writeValue(value:any):void
    {
        this.value = value;
    }

    public get emptyValueSelected():boolean
    {
        return isNullOrUndefined(this.selectedValue) ||
               (StringHelper.isNullUndefinedOrEmpty(this.selectedValue.caption.toString()) &&
                StringHelper.isNullUndefinedOrEmpty(this.selectedValue.icon));
    }

    public get value():any
    {
        return this._value;
    }

    public set value(value:any)
    {
        this._value = value;

        if(!isNullOrUndefined(value))
        {
            let valueToSelect:TerraSelectBoxValueInterface = this.inputListBoxValues.find((item:TerraSelectBoxValueInterface) =>
            {
                return item.value === value;
            });
            if(!isNullOrUndefined(valueToSelect))
            {
                this.selectedValue = valueToSelect;
            }
            else if(!isNullOrUndefined(this.inputListBoxValues[0]))
            {
                this.selectFallbackValue();
            }
        }
        else if(!isNullOrUndefined(this.inputListBoxValues[0]))
        {
            this.selectFallbackValue();
        }
    }

    public validate(formControl:FormControl):void
    {
        if(formControl.valid)
        {
            this.isValid = true;
        }
        else
        {
            if(!this.inputIsDisabled)
            {
                this.isValid = false;
            }
        }
    }

    protected onClick(evt:Event):void
    {
        evt.stopPropagation(); // prevents the click listener on the document to be fired right after
        this.toggleOpen = !this.toggleOpen;
    }

    protected onKeyDown(event:KeyboardEvent):void
    {
        // check if one of the dedicated keys has been pressed
        if(this.isIncorrectKeyEvent(event.code))
        {
            return;
        }

        // check if there is any selected value yet
        if(isNullOrUndefined(this.tmpSelectedValue) && this.inputListBoxValues.length > 0)
        {
            this.tmpSelectedValue = this.inputListBoxValues[0];
        }

        // get the array index of the selected value
        let index:number = this.inputListBoxValues.findIndex((item:TerraSelectBoxValueInterface) =>
            item.value === this.tmpSelectedValue.value
        );

        // check if element has been found
        if(index >= 0)
        {
            // determine the key, that has been pressed
            switch(event.code)
            {
                case 'Space':
                    this.toggleOpen = !this.toggleOpen;
                    break;
                case 'ArrowDown': // mark the succeeding list element
                    if(index + 1 < this.inputListBoxValues.length)
                    {
                        // open dropdown if not already opened
                        if(!this.toggleOpen)
                        {
                            this.toggleOpen = true;
                        }
                        // mark next element for selection
                        this.tmpSelectedValue = this.inputListBoxValues[index + 1];
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
                        this.tmpSelectedValue = this.inputListBoxValues[index - 1];
                        // adjust scrolling viewport
                        this.focusSelectedElement();
                    }
                    break;
                case 'Enter': // select the marked element
                    // check if element is really available
                    if(this.toggleOpen && this.inputListBoxValues.find((item:TerraSelectBoxValueInterface) => item === this.tmpSelectedValue))
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

        event.preventDefault();
        // stop event bubbling
        event.stopPropagation();
    }

    protected onBlur():void
    {
        this.toggleOpen = false;
    }

    private sortListBoxValues():void
    {
        if(!this.disableSorting)
        {
            this.inputListBoxValues = SelectBoxSortHelper.sortArray(this.inputListBoxValues, this.sortDirection, 'caption');
        }
    }

    /**
     *
     * @param event
     */
    private clickedOutside(event:Event):void
    {
        if(!this.elementRef.nativeElement.contains(event.target))
        {
            this.toggleOpen = false;
        }
    }

    private set toggleOpen(value:boolean)
    {
        if(this._toggleOpen !== value && value === true)
        {
            document.addEventListener('click', this.clickListener, true);
        }
        else if(this._toggleOpen !== value && value === false)
        {
            document.removeEventListener('click', this.clickListener);
        }

        this._toggleOpen = value;
    }

    private get toggleOpen():boolean
    {
        return this._toggleOpen;
    }

    /**
     *
     * @param value
     */
    private select(value:TerraSelectBoxValueInterface):void
    {
        if(isNullOrUndefined(this.selectedValue) || this.selectedValue.value !== value.value)
        {
            this.onChangeCallback(value.value);
        }

        this.selectedValue = value;
        this.onTouchedCallback();
    }

    private isIncorrectKeyEvent(eventCode:string):boolean
    {
        return !(eventCode === 'ArrowDown' ||
                 eventCode === 'ArrowUp' ||
                 eventCode === 'Enter' ||
                 eventCode === 'Escape' ||
                 eventCode === 'Space');
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

    private selectFallbackValue():void
    {
        this.selectedValue = this.inputListBoxValues[0];
        this.onTouchedCallback();
        this.onChangeCallback(this.inputListBoxValues[0].value);
    }
}
