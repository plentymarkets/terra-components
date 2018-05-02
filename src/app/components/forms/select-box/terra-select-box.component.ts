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
import {
    isNull,
    isNullOrUndefined
} from 'util';
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
    public outputValueChanged:EventEmitter<TerraSelectBoxValueInterface> = new EventEmitter<TerraSelectBoxValueInterface>();

    @Output()
    public inputSelectedValueChange:EventEmitter<TerraSelectBoxValueInterface> = new EventEmitter<TerraSelectBoxValueInterface>();

    public isValid:boolean;

    private _value:number | string;
    private _selectedValue:TerraSelectBoxValueInterface;
    private _toggleOpen:boolean;
    private _hasLabel:boolean;
    private _isInit:boolean;
    private clickListener:(event:Event) => void;

    /**
     * @deprecated
     * @param value
     */
    @Input()
    public set inputSelectedValue(value:number | string)
    {
        console.warn('inputSelectedValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');
        if(!isNullOrUndefined(value))
        {
            this.inputListBoxValues
                .forEach((item:TerraSelectBoxValueInterface) =>
                {
                    if(item.value === value)
                    {
                        this._selectedValue = item;
                    }
                });

            this.inputSelectedValueChange.emit(this._selectedValue.value);
        }
    }

    public get inputSelectedValue():number | string
    {
        return this._selectedValue.value;
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

        this._isInit = false;
        this.inputTooltipPlacement = 'top';
        this.inputIsSmall = false;
        this.inputOpenOnTop = false;
    }

    public ngOnInit():void
    {
        this.isValid = true;
        this._toggleOpen = false;
        this._hasLabel = !isNull(this.inputName);
        this._isInit = true;
    }

    /**
     *
     * @param changes
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        if(this._isInit === true
           && changes['inputListBoxValues']
           && changes['inputListBoxValues'].currentValue.length > 0
           && !this.inputListBoxValues.find((x:TerraSelectBoxValueInterface):boolean => this._selectedValue === x))
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
        return StringHelper.isNullUndefinedOrEmpty(this._selectedValue.caption.toString()) &&
               StringHelper.isNullUndefinedOrEmpty(this._selectedValue.icon);
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
                        this._selectedValue = item;
                    }
                });
        }
        else if(!isNullOrUndefined(this.inputListBoxValues[0]))
        {
            this._selectedValue = this.inputListBoxValues[0];
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
                //        this._alert.addAlert({
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
                //        this._alert.addAlert({
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
}
