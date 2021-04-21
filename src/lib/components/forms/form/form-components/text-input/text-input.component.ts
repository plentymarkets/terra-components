import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextInputInterface } from './text-input.interface';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { noop } from 'rxjs';

@Component({
    selector: 'tc-text-input',
    templateUrl: './text-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextInputComponent,
            multi: true
        }
    ]
})
export class TextInputComponent implements ControlValueAccessor, TextInputInterface {
    /**
     * @description If true, the type of input will be 'password'.
     * @default false
     */
    @Input()
    public isPassword: boolean = false;

    /**
     * @description If true, the input will check if the input is a valid iban.
     * @default false
     */
    @Input()
    public isIban: boolean = false;

    /**
     * @description If true, the value cannot be changed.
     * @default false
     */
    @Input()
    public isReadonly: boolean = false;

    /** @description If true, the button will be disabled. Default false. */
    @Input()
    public isDisabled: boolean = false;

    /** @description If true, a * indicates that the value is required. Default false. */
    @Input()
    public isRequired: boolean = false;

    /** @description Set the maximum number value allowed. */
    @Input()
    public maxLength: number;

    /** @description Set the minimum number value allowed. */
    @Input()
    public minLength: number;

    /** @description Set the label. */
    @Input()
    public name: string = '';

    /** @description Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** @description Set the tooltip. */
    @Input()
    public tooltipText: string = '';

    /** @description The internal data model */
    public value: string;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    public _onTouchedCallback: () => void = noop;
    public _onChangeCallback: (_: string) => void = noop;

    /** @description Registers a callback function that is called when the control's value changes in the UI.*/
    public registerOnChange(fn: (_: string) => void): void {
        this._onChangeCallback = fn;
    }

    /** @description Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** @description Writes a new value to the element.*/
    public writeValue(value: string): void {
        this.value = value;
    }
}
