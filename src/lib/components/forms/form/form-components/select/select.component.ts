import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';

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
export class SelectComponent implements ControlValueAccessor, TerraFormComponentBaseInterface, OnInit {
    public ngOnInit(): void {}

    public registerOnChange(fn: any): void {}

    public registerOnTouched(fn: any): void {}

    public writeValue(obj: any): void {}

    @Input()
    public isDisabled:boolean;
    public isRequired:boolean;
    public name:string;
    public tooltipPlacement:string;
    public tooltipText:string;
}
