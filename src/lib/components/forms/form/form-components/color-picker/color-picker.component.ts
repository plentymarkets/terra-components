import {
    Component,
    Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';

@Component({
    selector: 'color-picker',
    templateUrl: './color-picker.component',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ColorPickerComponent,
            multi: true
        }
    ]
})
export class ColorPickerComponent implements TerraFormComponentBaseInterface{
    @Input()
    public isDisabled:boolean;

    @Input()
    public isRequired:boolean;

    @Input()
    public name:string;

    @Input()
    public tooltipPlacement:string;

    @Input()
    public tooltipText:string;
}
