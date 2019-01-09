import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';
import * as IBAN from 'iban';

/**
 * IBAN validation for reactive FormControls
 * @returns ValidatorFn
 */
export function ibanValidator(control:AbstractControl):ValidationErrors
{
    if(!IBAN.isValid(control.value))
    {
        return {iban: true};
    }

    return null;
}
