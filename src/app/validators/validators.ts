import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';
import { ibanValidator } from './iban-validator';
import { terraDecimalValidator } from './decimal/terra-decimal-validator';

export class TerraValidators
{
    public static decimal(maxLength:number, decimals:number):ValidatorFn
    {
        return terraDecimalValidator(maxLength, decimals);
    }

    public static iban(control:AbstractControl):ValidationErrors | null
    {
        return ibanValidator()(control);
    }
}
