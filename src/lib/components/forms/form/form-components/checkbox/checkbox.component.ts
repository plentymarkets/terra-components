import { Component, Input } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { noop } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxInterface } from './checkbox.interface';
import { FocusOrigin } from '@angular/cdk/a11y';

@Component({
    selector: 'tc-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CheckboxComponent,
            multi: true
        }
    ]
})
export class CheckboxComponent implements ControlValueAccessor, CheckboxInterface {
    /**
     * @description If true, the check box will be disabled. Default false.
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

    /** @description Set the state indeterminate of the checkbox.*/
    @Input()
    public isIndeterminate: boolean = false;

    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     * */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /**
     * @description Set an icon (e.g. icon-save).
     */
    @Input()
    public icon: string;

    /** @description Stores a callback function which is executed whenever the checkbox was blurred. */
    public _onTouchedCallback: () => void = noop;

    /** @description Stores a callback function which is executed whenever the value of the checkbox changes. */
    public _onChangeCallback: (_: boolean) => void = noop;

    /** @description Internal model. The value of the checkbox. */
    public value: boolean;

    /** @description Writes a new value to the element.*/
    public writeValue(value: boolean): void {
        this.value = value;
    }

    /** @description Registers a callback function that is called when the control's value changes in the UI.*/
    public registerOnChange(fn: (_: boolean) => void): void {
        this._onChangeCallback = fn;
    }

    /** @description Registers a callback function that is called by the forms API on initialization to update the form model on blur.*/
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** @description Handles focus changes to the checkbox. If checkbox is blurred, call onTouchedCallback.*/
    public _onFocusChange(origin: FocusOrigin): void {
        if (origin === null) {
            this._onTouchedCallback();
        }
    }
}
