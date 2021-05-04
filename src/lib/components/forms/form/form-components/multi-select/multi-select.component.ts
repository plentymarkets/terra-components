import { Component, Input } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { TerraSelectBoxValueInterface } from '../../../select-box/data/terra-select-box.interface';
import { noop } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectInterface } from './multi-select.interface';

@Component({
    selector: 'tc-multi-select',
    templateUrl: './multi-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: MultiSelectComponent,
            multi: true
        }
    ]
})
export class MultiSelectComponent implements ControlValueAccessor, MultiSelectInterface {
    /** The name of the control which will be used as label. */
    @Input()
    public name: string = '';

    /** Disables the input when set to true. Default false. */
    @Input()
    public isDisabled: boolean = false;

    /** Requires the input to be filled when set to true. Default false. */
    @Input()
    public isRequired: boolean = false;

    /** Text that should be shown in a tooltip on the control. */
    @Input()
    public tooltipText: string;

    /** Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** List of options that the user can select from. */
    @Input()
    public listBoxValues: Array<TerraSelectBoxValueInterface>;

    /** Internal model. Stores the value of the selected option. */
    public value: Array<TerraSelectBoxValueInterface>;

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
    public writeValue(value: Array<TerraSelectBoxValueInterface>): void {
        this.value = value;
    }
}
