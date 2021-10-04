import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as IBAN from 'iban';
import { Directive, Input } from '@angular/core';

/**
 * IBAN validation for reactive FormControls
 */
export function ibanValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && !IBAN.isValid(control.value)) {
        return { iban: true };
    }

    return null;
}

/** @description This directive is used to validate whether a valid IBAN has been entered. */
@Directive({
    selector: 'input[iban][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: IbanValidatorDirective, multi: true }]
})
export class IbanValidatorDirective implements Validator {
    /** @description Whether the control should be validated. */
    /* tslint:disable-next-line:no-input-rename */
    @Input('iban')
    public shouldValidate: boolean;

    /** @description Validates the control when {@link shouldValidate} is set. */
    public validate(control: AbstractControl): ValidationErrors | null {
        return this.shouldValidate ? ibanValidator(control) : null;
    }
}
