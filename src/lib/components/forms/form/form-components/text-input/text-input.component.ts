import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { TextInputInterface } from './text-input.interface';

@Component({
    selector: 'tc-text-input',
    templateUrl: './text-input.component',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextInputComponent,
            multi: true
        }
    ]
})
export class TextInputComponent implements ControlValueAccessor, TextInputInterface {
    @Input()
    public isDisabled: boolean;

    @Input()
    public isIban: boolean;

    @Input()
    public isPassword: boolean;

    @Input()
    public isReadonly: boolean;

    @Input()
    public isRequired: boolean;

    @Input()
    public maxLength: number;

    @Input()
    public minLength: number;

    @Input()
    public name: string;

    @Input()
    public tooltipPlacement: string;

    @Input()
    public tooltipText: string;

    @Input()
    public value: string;

    constructor() {}

    public registerOnChange(fn: any): void {}

    public registerOnTouched(fn: any): void {}

    public writeValue(obj: any): void {}
}
