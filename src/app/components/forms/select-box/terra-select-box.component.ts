import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output
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
export class TerraSelectBoxComponent implements OnInit
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

    /**
     * @description adds an empty selection value to the list
     * @default false
     */
    @Input()
    public withEmptySelect:boolean = false; // This input needs to be place before inputListBoxValues-Setter!

    @Input()
    public set inputListBoxValues(values:Array<TerraSelectBoxValueInterface>)
    {
        this.listBoxValues = this.withEmptySelect ? [this.emptySelect].concat(values) : values;

        let selectedValue:TerraSelectBoxValueInterface = this.listBoxValues.find((x:TerraSelectBoxValueInterface):boolean =>
            !isNullOrUndefined(this.selectedValue) && this.selectedValue.value === x.value
        );
        if(this.listBoxValues.length > 0 && isNullOrUndefined(selectedValue))
        {
            this.select(this.listBoxValues[0]);
        }
    }

    /**
     * @deprecated
     */
    @Output()
    public outputValueChanged:EventEmitter<TerraSelectBoxValueInterface> = new EventEmitter<TerraSelectBoxValueInterface>();

    @Output()
    public inputSelectedValueChange:EventEmitter<TerraSelectBoxValueInterface> = new EventEmitter<TerraSelectBoxValueInterface>();

    public isValid:boolean;

    protected listBoxValues:Array<TerraSelectBoxValueInterface> = [];
    protected selectedValue:TerraSelectBoxValueInterface;
    protected hasLabel:boolean;

    private _value:number | string;
    private _toggleOpen:boolean;
    private clickListener:(event:Event) => void;

    private readonly emptySelect:TerraSelectBoxValueInterface;

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
            this.listBoxValues.forEach((item:TerraSelectBoxValueInterface) =>
            {
                if(item.value === value)
                {
                    this.selectedValue = item;
                }
            });

            this.inputSelectedValueChange.emit(this.selectedValue.value);
        }
    }

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

        this.inputTooltipPlacement = 'top';
        this.inputIsSmall = false;
        this.inputOpenOnTop = false;
        this.emptySelect = {
            value:   null,
            caption: ''
        };
    }

    public ngOnInit():void
    {
        this.isValid = true;
        this._toggleOpen = false;
        this.hasLabel = !isNull(this.inputName);
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
            this.listBoxValues.forEach((item:TerraSelectBoxValueInterface) =>
            {
                if(item.value === value)
                {
                    this.selectedValue = item;
                }
            });
        }
        else if(!isNullOrUndefined(this.listBoxValues[0]))
        {
            this.selectedValue = this.listBoxValues[0];
            this.onTouchedCallback();
            this.onChangeCallback(this.listBoxValues[0].value);
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
    protected select(value:TerraSelectBoxValueInterface):void
    {
        if(isNullOrUndefined(value))
        {
            return;
        }

        if(this.selectedValue !== value)
        {
            this.selectedValue = value;
            this.onTouchedCallback();
            this.onChangeCallback(value.value);
            this.outputValueChanged.emit(value);
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
}
