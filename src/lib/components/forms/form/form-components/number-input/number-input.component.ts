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
    @Input()
    public isDisabled: boolean;

    @Input()
    public isRequired: boolean;

    @Input()
    public maxLength: number;

    /** @description Set the maximum number value allowed. */
    @Input()
    public maxValue: number;

    /**  @description Set a minimum number of characters allowed. */
    @Input()
    public minLength: number;

    /** @description Set the minimum number value allowed. */
    @Input()
    public minValue: number;

    @Input()
    public name: string;

    @Input()
    public tooltipPlacement: string;

    @Input()
    public tooltipText: string;

    // The internal data model
    public value: number;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    public registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    public writeValue(value: number): void {
        this.value = value;
    }

    // Set touched on blur
    public onBlur(): void {
        this._onTouchedCallback();
    }
}
