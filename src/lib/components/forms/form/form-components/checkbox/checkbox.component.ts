import { Component, Input } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { noop } from 'rxjs';

@Component({
    selector: 'tc-checkbox',
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {
    @Input()
    public caption: string = '';

    @Input()
    public isDisabled: boolean = false;

    @Input()
    public isRequired: boolean = false;

    @Input()
    public tooltipText: string;

    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    @Input()
    public icon: string;

    @Input()
    public isIndeterminate: boolean;

    public value: boolean;

    public _onTouchedCallback: () => void = noop;

    public _onChangeCallback: (_: boolean) => void = noop;

    public registerOnChange(fn: (_: boolean) => void): void {
        //
    }

    public registerOnTouched(fn: () => void): void {
        //
    }

    public writeValue(value: boolean): void {
        //
    }
}
