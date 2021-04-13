import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'tc-select',
    templateUrl: './select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectComponent,
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
    public ngOnInit(): void {}

    public registerOnChange(fn: any): void {}

    public registerOnTouched(fn: any): void {}

    public writeValue(obj: any): void {}
}
