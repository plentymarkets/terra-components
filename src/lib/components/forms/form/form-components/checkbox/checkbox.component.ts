import { Component, Input, OnInit } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { noop } from 'rxjs';

@Component({
    selector: 'tc-checkbox',
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {
    @Input()
    public name: string = '';

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

    public value: any;

    public _onTouchedCallback: () => void = noop;

    public _onChangeCallback: (_: any) => void = noop;

    public registerOnChange(fn: (_: any) => void): void {
        //
    }

    public registerOnTouched(fn: () => void): void {
        //
    }

    public writeValue(value: any): void {
        //
    }
}
