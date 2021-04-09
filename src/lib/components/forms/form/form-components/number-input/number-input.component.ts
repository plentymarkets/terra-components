import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NumberInputInterface } from './number-input.interface';
import { noop } from 'rxjs';

let nextId: number = 0;

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
    public emptyMessage: string;

    @Input()
    public invalidMessage: string;

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

    public isValid: boolean;
    public regex: string;

    // The internal data model
    public _innerValue: number;

    /** @description a unique string identifier for the specific input instance. */
    public _id: string;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    constructor(private _inputRegex: string) {
        this.regex = _inputRegex;
        this.isValid = true;

        // generate the id of the input instance
        this._id = `number-input_#${nextId++}`;
    }

    public registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    public writeValue(value: number): void {
        if (value !== this._innerValue) {
            this._innerValue = value;
        }
    }

    // get accessor
    public get value(): number {
        return this._innerValue;
    }

    // set accessor including call the onchange callback
    public set value(v: number) {
        if (v !== this._innerValue) {
            this._innerValue = v;
            this._onChangeCallback(this._innerValue);
        }
    }

    // Set touched on blur
    public onBlur(): void {
        this._onTouchedCallback();
    }
}
