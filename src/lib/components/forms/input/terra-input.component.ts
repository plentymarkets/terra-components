import { Input, Directive } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';
import { noop } from 'rxjs';

// tslint:disable:directive-class-suffix
/** @deprecated since v5. Use angular material's [input](https://material.angular.io/components/input) instead. */
@Directive()
export class TerraInputComponent implements ControlValueAccessor {
    /**
     * @description Set the label.
     */
    @Input()
    public inputName: string;

    /**
     * @description If true, a * indicates that the value is required. Default false.
     */
    @Input()
    public inputIsRequired: boolean;

    @Input()
    public inputEmptyMessage: string;

    @Input()
    public inputInvalidMessage: string;

    /**
     * @description Set the tooltip.
     */
    @Input()
    public inputTooltipText: string;

    /**
     * @description If true, the button will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled: boolean;

    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     */
    @Input()
    public inputTooltipPlacement: TerraPlacementEnum;

    /**
     * @description Set a maximum number of characters allowed.
     */
    @Input()
    public inputMaxLength: number;

    /**
     * @description Set the maximum number value allowed.
     */
    @Input()
    public inputMaxValue: number;

    /**
     * @description Set a minimum number of characters allowed.
     */
    @Input()
    public inputMinLength: number;

    /**
     * @description Set the minimum number value allowed.
     */
    @Input()
    public inputMinValue: number;

    /**
     * @description If true, the button will be small. Default false.
     */
    @Input()
    public inputIsSmall: boolean;

    public isValid: boolean;
    public regex: string;

    // The internal data model
    public _innerValue: any;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    constructor(private _inputRegex: string) {
        this.regex = _inputRegex;
        this.isValid = true;
        this.inputIsSmall = false;
    }

    public get isDisabled(): boolean {
        return this.inputIsDisabled;
    }

    public set isDisabled(value: boolean) {
        this.inputIsDisabled = value;
    }

    // get accessor
    public get value(): any {
        return this._innerValue;
    }

    // set accessor including call the onchange callback
    public set value(v: any) {
        if (v !== this._innerValue) {
            this._innerValue = v;
            this._onChangeCallback(this._innerValue);
        }
    }

    // Set touched on blur
    public onBlur(): void {
        this._onTouchedCallback();
    }

    // From ControlValueAccessor interface
    public writeValue(value: any): void {
        if (value !== this._innerValue) {
            this._innerValue = value;
        }
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    public validate(formControl: FormControl): void {
        if (formControl.valid) {
            this.isValid = true;
        } else {
            if (!this.isDisabled) {
                this.isValid = false;
            }
        }
    }
}
