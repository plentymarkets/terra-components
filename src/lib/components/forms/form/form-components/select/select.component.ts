import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectInterface } from './select.interface';
import { TerraSelectBoxValueInterface } from '../../../select-box/data/terra-select-box.interface';
import { noop } from 'rxjs';

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
export class SelectComponent implements ControlValueAccessor, SelectInterface, OnInit {
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

    @Input()
    public listBoxValues: Array<TerraSelectBoxValueInterface>;

    public ngOnInit(): void {}

    public registerOnChange(fn: any): void {}

    public registerOnTouched(fn: any): void {}

    public writeValue(obj: any): void {}
}
