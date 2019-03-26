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
import { noop } from 'rxjs/util/noop';

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
    public tooltipPlacement:TerraPlacementEnum = TerraPlacementEnum.TOP;

    /**
     * @description set accessor for the current value of the check box.
     * @deprecated use ngModel instead.
     * @param value
     */
    @Input()
    public set value(value:boolean)
    {
        this.writeValue(value);
    }

    /**
     * @description get accessor for the current value of the check box
     * @deprecated use ngModel instead
     */
    public get value():boolean
    {
        return this.innerValue;
    }

    /**
     * @description Set accessor for the indeterminate state of the checkbox
     * @param value
     */
    @Input()
    public set isIndeterminate(value:boolean)
    {
        if(value)
        {
            this.innerValue = null;
        }
        this._isIndeterminate = value;
    }

    /**
     * @description get accessor for indeterminate state of the checkbox
     */
    public get isIndeterminate():boolean
    {
        return this._isIndeterminate;
    }

    /**
     * @description Emits the current value when it has changed.
     * @deprecated use ngModelChange instead.
     */
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

    private onTouchedCallback:() => void = noop;
    private onChangeCallback:(value:any) => void = noop;

    constructor()
    {
        // generate the id of the input instance
        this.id = `checkbox_#${nextId++}`;
    }

    /**
     * @description Notifies a consumer via `ngModelChange` and `valueChange` with the given value.
     * Is called whenever the value of the checkbox changes.
     * @param value
     */
    public onChange(value:boolean):void
    {
        this.onChangeCallback(value);
        this.valueChange.emit(value);
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Updates the innerValue of the checkbox based on the given value.
     * @param value
     */
    public writeValue(value:boolean):void
    {
        if(!isNullOrUndefined(value) && value !== this.innerValue)
        {
            this._isIndeterminate = false;
            this.innerValue = value;
        }
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Registers a given callback method, which will be called whenever the value of the checkbox changes.
     * @param fn
     */
    public registerOnChange(fn:(value:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Registers a given callback method, which will be called whenever the checkbox has been touched.
     * @param fn
     */
    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }
}
