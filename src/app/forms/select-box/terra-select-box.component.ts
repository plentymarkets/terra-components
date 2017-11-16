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
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';
import {
    FormControl,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { isNullOrUndefined } from 'util';

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
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputIsDisabled:boolean;
    @Input() inputIsSmall:boolean;
    @Input() inputOpenOnTop:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string;
    @Input() inputListBoxValues:Array<TerraSelectBoxValueInterface>;
    @Output() outputValueChanged = new EventEmitter<TerraSelectBoxValueInterface>();
    @Output() inputSelectedValueChange = new EventEmitter<TerraSelectBoxValueInterface>();

    private clickListener:(event:Event) => void;

    /**
     * @deprecated
     * @param value
     */
    @Input()
    set inputSelectedValue(value:number | string)
    {
        console.warn('inputSelectedValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');
        if(value !== undefined && value != null)
        {
            this.inputListBoxValues
                .forEach((item:TerraSelectBoxValueInterface) =>
                {
                    if(item.value == value)
                    {
                        this._selectedValue = item;
                    }
                });

            this.inputSelectedValueChange.emit(this._selectedValue.value);
        }
    }

    get inputSelectedValue():number | string
    {
        return this._selectedValue.value;
    }

    private _value:number | string;
    private _selectedValue:TerraSelectBoxValueInterface;
    private _toggleOpen:boolean;
    private _hasLabel:boolean;
    private _isValid:boolean;
    private _isInit:boolean;

    /**
     *
     * @param elementRef
     */
    constructor(private elementRef:ElementRef)
    {
        this.clickListener = (event) =>
        {
            this.clickedOutside(event);
        };

        this._isInit = false;
        this.inputTooltipPlacement = 'top';
        this.inputIsSmall = false;
        this.inputOpenOnTop = false;
    }

    ngOnInit()
    {
        this._isValid = true;
        this._toggleOpen = false;
        this._hasLabel = this.inputName != null;
        this._isInit = true;
    }

    /**
     *
     * @param changes
     */
    ngOnChanges(changes:SimpleChanges)
    {
        if(this._isInit == true
           && changes["inputListBoxValues"]
           && changes["inputListBoxValues"].currentValue.length > 0
           && !this.inputListBoxValues.find((x) => this._selectedValue === x))
        {
            this.select(this.inputListBoxValues[0]);
        }
    }

    /**
     *
     * Two way data binding by ngModel
     */
    private onTouchedCallback:() => void = () =>
    {
    };

    private onChangeCallback:(_:any) => void = (_) =>
    {
    };

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    public writeValue(value:any):void
    {
        this.value = value;
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
                    if(item.value == value)
                    {
                        this._selectedValue = item;
                    }
                });
        }
        else
        {
            this._selectedValue = this.inputListBoxValues[0];
        }
    }

    public get isValid():boolean
    {
        return this._isValid;
    }

    public set isValid(value:boolean)
    {
        this._isValid = value;
    }

    private set toggleOpen(value)
    {
        if(this._toggleOpen !== value && value == true)
        {
            document.addEventListener('click', this.clickListener, true);
        }
        else if(this._toggleOpen !== value && value == false)
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

    private onClick(evt:Event):void
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
        this._selectedValue = value;
        this.onTouchedCallback();
        this.onChangeCallback(value.value);
        this.outputValueChanged.emit(value);
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

                //if(this.inputIsRequired && (isNullOrUndefined(this.value) || this.value.length == 0))
                //{
                //    let emptyMessage:string;
                //
                //    if(!this.inputEmptyMessage || this.inputEmptyMessage.length == 0)
                //    {
                //        ////TODO i18n
                //        //emptyMessage = 'Mach eine Eingabe!';
                //
                //    }
                //    else
                //    {
                //        emptyMessage = this.inputEmptyMessage;
                //
                //        this._alert.addAlert({
                //                                 msg:              emptyMessage,
                //                                 closable:         true,
                //                                 type:             'danger',
                //                                 dismissOnTimeout: 0
                //                             });
                //    }
                //}
                //else if(!isNullOrUndefined(this.value) && this.value.length > 0)
                //{
                //    let invalidMessage:string;
                //
                //    if(!this.inputInvalidMessage || this.inputInvalidMessage.length == 0)
                //    {
                //        ////TODO i18n
                //        //invalidMessage = 'Eingabe ungültig!';
                //    }
                //    else
                //    {
                //        invalidMessage = this.inputInvalidMessage;
                //
                //        this._alert.addAlert({
                //                                 msg:              invalidMessage,
                //                                 closable:         true,
                //                                 type:             'danger',
                //                                 dismissOnTimeout: 0
                //                             });
                //    }
                //}
            }
        }
    }
}
