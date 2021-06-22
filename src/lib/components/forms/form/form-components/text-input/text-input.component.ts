import { Component, Inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextInputInterface } from './text-input.interface';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { noop } from 'rxjs';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';

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

    /**
     * @description If true, the button will be disabled.
     * @Default false.
     * */
    @Input()
    public isDisabled: boolean = false;

    /**
     * @description If true, a * indicates that the value is required.
     *  @Default false.
     *  */
    @Input()
    public isRequired: boolean = false;

    /** @description Set the maximum number of required characters. */
    @Input()
    public maxLength: number;

    /** @description Set the minimum number of required characters. */
    @Input()
    public minLength: number;

    /** @description Set the label. */
    @Input()
    public name: string = '';

    /** @description Whether entered text should be an email. **/
    @Input()
    public email: boolean = false;

    /** @description Set the tooltip. */
    @Input()
    public tooltipText: string = '';

    /**
     * @description Set the tooltip placement (bottom, top, left, right).
     * @default top
     * */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** Stores the pattern for the validation. */
    @Input()
    public pattern: string = '';

    /** @description The internal data model */
    public value: string;

    /** Stores a callback function which is executed whenever the input was blurred. */
    public _onTouchedCallback: () => void = noop;

    /** Stores a callback function which is executed whenever the value of the input changes. */
    public _onChangeCallback: (_: string) => void = noop;

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {}

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
