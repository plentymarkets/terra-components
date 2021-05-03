import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';
import { noop } from 'rxjs';
import { Color } from '../../../../../helpers';

@Component({
    selector: 'tc-color-picker',
    templateUrl: './color-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ColorPickerComponent,
            multi: true
        }
    ]
})
export class ColorPickerComponent implements ControlValueAccessor, TerraFormComponentBaseInterface {
    @Input()
    public isDisabled: boolean;

    @Input()
    public isRequired: boolean;

    @Input()
    public name: string;

    @Input()
    public tooltipPlacement: string;

    @Input()
    public tooltipText: string;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: any) => void): void {
        // this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        // this._onTouchedCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: any): void {
        // this.value = value;
    }
}
