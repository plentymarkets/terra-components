import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'tc-datepicker',
    templateUrl: './datepicker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DatePickerComponent,
            multi: true
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor {
    @Input()
    public isDisabled: boolean;

    @Input()
    public isReadonly: boolean;

    @Input()
    public isRequired: boolean;

    @Input()
    public name: string;

    @Input()
    public tooltipPlacement: string;

    @Input()
    public tooltipText: string;

    constructor() {}

    public registerOnChange(fn: any): void {}

    public registerOnTouched(fn: any): void {}

    public writeValue(obj: any): void {}
}
