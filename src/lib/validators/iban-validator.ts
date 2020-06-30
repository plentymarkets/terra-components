import {
    AbstractControl,
    ValidationErrors
} from '@angular/forms';
import * as IBAN from 'iban';

/**
 * IBAN validation for reactive FormControls
 */
export function ibanValidator(control:AbstractControl):ValidationErrors
{
    if(!IBAN.isValid(control.value))
    {
        return {iban: true};
    }

    return null;
}
