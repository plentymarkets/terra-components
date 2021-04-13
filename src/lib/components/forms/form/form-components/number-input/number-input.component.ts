import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NumberInputInterface } from './number-input.interface';
import { noop } from 'rxjs';

@Component({
    selector: 'number-input',
    templateUrl: './number-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: NumberInputComponent,
            multi: true
        }
    ]
})
export class NumberInputComponent implements ControlValueAccessor, NumberInputInterface {
    /** @description If true, the button will be disabled. Default false. */
    @Input()
    public isDisabled: boolean;

    /** @description If true, a * indicates that the value is required. Default false. */
    @Input()
    public isRequired: boolean;

    /** @description Set the maximum number value allowed. */
    @Input()
    public maxValue: number;

    /** @description Set the minimum number value allowed. */
    @Input()
    public minValue: number;

    /** @description Set the label. */
    @Input()
    public name: string;

    /** @description Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: string;

    /** @description Set the tooltip. */
    @Input()
    public tooltipText: string;

    /** @description The internal data model */
    public value: number;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    public _onTouchedCallback: () => void = noop;
    public _onChangeCallback: (_: number) => void = noop;

    /** @description Registers a callback function that is called when the control's value changes in the UI.*/
    public registerOnChange(fn: () => number): void {
        this._onChangeCallback = fn;
    }

    /** @description Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** @description Writes a new value to the element.*/
    public writeValue(value: number): void {
        this.value = value;
    }
}
