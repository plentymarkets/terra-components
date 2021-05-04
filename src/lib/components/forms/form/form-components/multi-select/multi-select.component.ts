import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TerraPlacementEnum } from '../../../../../helpers';
import { noop } from 'rxjs';

@Component({
    selector: 'tc-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements ControlValueAccessor {
    /**
     * @description If true, the select will be disabled. Default false.
     */
    @Input()
    public isDisabled: boolean = false;

    /** @description If true, a * indicates that the value is required. Default false. */
    @Input()
    public isRequired: boolean = false;

    /**
     * @description Set the caption.
     */
    @Input()
    public name: string = '';

    /** @description Set the tooltip.*/
    @Input()
    public tooltipText: string = '';

    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     * */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** @description List of available options of the select. */
    @Input()
    public selectValues: Array<{ caption: string; value: any }> = [];

    /** @description Stores a callback function which is executed whenever the select was blurred. */
    public _onTouchedCallback: () => void = noop;

    /** @description Stores a callback function which is executed whenever the value of the select changes. */
    public _onChangeCallback: (_: boolean) => void = noop;

    /** @description Internal model. The value of the selectBox. */
    public value: boolean;

    /** @description Writes a new value to the element.*/
    public writeValue(values: Array<any>): void {
        //
    }

    /** @description Registers a callback function that is called when the control's value changes in the UI.*/
    public registerOnChange(fn: (_: boolean) => void): void {
        //
    }

    /** @description Registers a callback function that is called by the forms API on initialization to update the form model on blur.*/
    public registerOnTouched(fn: () => void): void {
        //
    }
}
