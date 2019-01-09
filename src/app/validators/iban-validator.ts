import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';
import * as IBAN from 'iban';

export function ibanValidator():ValidatorFn
{
    return (control:AbstractControl):ValidationErrors =>
    {
        if(!IBAN.isValid(control.value))
        {
            return {iban: true};
        }

        return null;
    };
}
