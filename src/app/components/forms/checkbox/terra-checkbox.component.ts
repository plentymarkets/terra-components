import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

let nextId:number = 0;

@Component({
    selector:  'terra-checkbox',
    styles:    [require('./terra-checkbox.component.scss')],
    template:  require('./terra-checkbox.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraCheckboxComponent),
            multi:       true
        }
    ]
})
export class TerraCheckboxComponent implements ControlValueAccessor
{
    /**
     * @description If true, the check box will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled:boolean;

    /**
     * @description Set the caption.
     */
    @Input()
    public inputCaption:string;

    /**
     * @description Set an icon (e.g. icon-save).
     */
    @Input()
    public inputIcon:string;

    /** @description Set the tooltip.*/
    @Input()
    public tooltipText:string;

    /** @description Set the tooltip placement (bottom, top, left, right). Default top.*/
    @Input()
    public tooltipPlacement:TerraPlacementEnum;

    @Output()
    public valueChange:EventEmitter<boolean> = new EventEmitter<boolean>();

    public isValid:boolean = true;

    /**
     * @description a unique string identifier for the specific input instance.
     */
    protected id:string;

    // The internal data model
    private innerValue:boolean = false;
    private _isIndeterminate:boolean = false;

    constructor()
    {
        // generate the id of the input instance
        this.id = `checkbox_#${nextId++}`;
        this.tooltipPlacement = TerraPlacementEnum.TOP;
    }

    // get accessor
    public get value():boolean
    {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    @Input()
    public set value(v:boolean)
    {
        if(!isNullOrUndefined(v) && v !== this.innerValue)
        {
            this._isIndeterminate = false;
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    public onChange(event:boolean):void
    {
        this.valueChange.emit(event);
    }

    // From ControlValueAccessor interface
    public writeValue(value:boolean):void
    {
        if(value !== this.innerValue)
        {
            this.value = value;
        }
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn:(_:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }

    public get isIndeterminate():boolean
    {
        return this._isIndeterminate;
    }

    @Input()
    public set isIndeterminate(value:boolean)
    {
        if(value)
        {
            this.innerValue = null;
        }
        this._isIndeterminate = value;
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;
}
