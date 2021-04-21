import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as IBAN from 'iban';
import { Directive, Input } from '@angular/core';

/**
 * IBAN validation for reactive FormControls
 */
export function ibanValidator(control: AbstractControl): ValidationErrors {
    if (!IBAN.isValid(control.value)) {
        return { iban: true };
    }

    return null;
}

@Directive({
    selector: 'input[iban][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: IbanValidatorDirective, multi: true }]
})
export class IbanValidatorDirective implements Validator {
    @Input('iban')
    public shouldValidate: boolean;

    public validate(control: AbstractControl): ValidationErrors | null {
        return this.shouldValidate ? ibanValidator(control) : null;
    }
}
