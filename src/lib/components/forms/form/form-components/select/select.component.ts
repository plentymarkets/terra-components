import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectInterface } from './select.interface';
import { TerraSelectBoxValueInterface } from '../../../select-box/data/terra-select-box.interface';
import { noop } from 'rxjs';
import { TerraPlacementEnum } from '../../../../../helpers';

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
export class SelectComponent implements ControlValueAccessor, SelectInterface {
    /** @description The name of the select box also used to set the label. */
    @Input()
    public name: string = '';

    @Input()
    public isDisabled: boolean = false;

    @Input()
    public isRequired: boolean = false;

    @Input()
    public tooltipText: string;

    /** @description Set the tooltip placement (bottom, top, left, right). Default bottom. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.BOTTOM;

    @Input()
    public listBoxValues: Array<TerraSelectBoxValueInterface>;

    /** Internal model. Stores the value of the selected option. */
    public value: any;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: any): void {
        this.value = value;
    }
}
