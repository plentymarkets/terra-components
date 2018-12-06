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
export class TerraSelectBoxComponent implements OnInit, OnChanges
{
    @Input()
    public inputName:string;

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

    @Input()
    public inputTooltipPlacement:string;

    @Input()
    public inputListBoxValues:Array<TerraSelectBoxValueInterface>;

    @Output()
    public inputSelectedValueChange:EventEmitter<TerraSelectBoxValueInterface> = new EventEmitter<TerraSelectBoxValueInterface>();

    public isValid:boolean;

    protected selectedValue:TerraSelectBoxValueInterface;
    protected tmpSelectedValue:TerraSelectBoxValueInterface;
    protected hasLabel:boolean;
    protected isTooltipDisabled:boolean;
    protected helperTooltip:string;
    protected isHelperTooltipDisabled:boolean;

    private _value:number | string;
    private _toggleOpen:boolean;
    private isInit:boolean;
    private clickListener:(event:Event) => void;

    @ViewChildren('renderedListBoxValues')
    private renderedListBoxValues:QueryList<ElementRef>;

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
        this.inputTooltipPlacement = 'top';
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
    }

    public registerOnChange(fn:(_:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }

    /**
     *
     * Two way data binding by ngModel
     */
    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;

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
            this.inputListBoxValues
                .forEach((item:TerraSelectBoxValueInterface) =>
                {
                    if(item.value === value)
                    {
                        this.selectedValue = item;
                    }
                });
        }
        else if(!isNullOrUndefined(this.inputListBoxValues[0]))
        {
            this.selectedValue = this.inputListBoxValues[0];
            this.onTouchedCallback();
            this.onChangeCallback(this.inputListBoxValues[0].value);
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
     * @param event
     */
    private clickedOutside(event:Event):void
    {
        if(!this.elementRef.nativeElement.contains(event.target))
        {
            this.toggleOpen = false;
        }
    }

    protected onClick(evt:Event):void
    {
        evt.stopPropagation(); // prevents the click listener on the document to be fired right after
        this.toggleOpen = !this.toggleOpen;
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

                // if(this.inputIsRequired && (isNullOrUndefined(this.value) || this.value.length == 0))
                // {
                //    let emptyMessage:string;
                //
                //    if(!this.inputEmptyMessage || this.inputEmptyMessage.length == 0)
                //    {
                //        //// TODO i18n
                //        // emptyMessage = 'Mach eine Eingabe!';
                //
                //    }
                //    else
                //    {
                //        emptyMessage = this.inputEmptyMessage;
                //
                //        this.alert.addAlert({
                //                                 msg:              emptyMessage,
                //                                 closable:         true,
                //                                 type:             'danger',
                //                                 dismissOnTimeout: 0
                //                             });
                //    }
                // }
                // else if(!isNullOrUndefined(this.value) && this.value.length > 0)
                // {
                //    let invalidMessage:string;
                //
                //    if(!this.inputInvalidMessage || this.inputInvalidMessage.length == 0)
                //    {
                //        //// TODO i18n
                //        // invalidMessage = 'Eingabe ungültig!';
                //    }
                //    else
                //    {
                //        invalidMessage = this.inputInvalidMessage;
                //
                //        this.alert.addAlert({
                //                                 msg:              invalidMessage,
                //                                 closable:         true,
                //                                 type:             'danger',
                //                                 dismissOnTimeout: 0
                //                             });
                //    }
                // }
            }
        }
    }

    protected onKeyDown(event:KeyboardEvent):void
    {
        // check if one of the dedicated keys has been pressed
        if(!(event.code === 'ArrowDown' ||
             event.code === 'ArrowUp' ||
             event.code === 'Enter' ||
             event.code === 'Escape' ||
             event.code === 'Space'))
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

    protected onBlur():void
    {
        this.toggleOpen = false;
    }
}
