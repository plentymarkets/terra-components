/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

/**
 * @author mfrank
 * @deprecated use <tc-radio-input> and <tc-radio-group> instead
 */
@Component({
    selector: 'terra-radio-button',
    templateUrl: './terra-radio-button.component.html',
    styleUrls: ['./terra-radio-button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraRadioButtonComponent,
            multi: true
        }
    ]
})
export class TerraRadioButtonComponent implements ControlValueAccessor {
    @Input()
    public inputCaption: string;

    @Input()
    public inputValue: string | number | boolean;

    @Input()
    public inputIsDisabled: boolean;

    @Input()
    public inputIsUncheckable: boolean;

    public _value: any;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor() {
        console.warn(`This component is deprecated. Please use <tc-radio-input> and <tc-radio-group> instead.`);
        this.inputIsUncheckable = false;
        this.inputIsDisabled = false;
    }

    @HostListener('click')
    public onClick(): void {
        if (this.inputIsDisabled) {
            return;
        }

        if (this.inputIsUncheckable && this.inputValue === this._value) {
            this._value = undefined;
        } else {
            this._value = this.inputValue;
        }

        this.onTouchedCallback();
        this.onChangeCallback(this._value);
    }

    public writeValue(value: any): void {
        this._value = value;
    }

    public registerOnChange(fn: (_: any) => void): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }
}
