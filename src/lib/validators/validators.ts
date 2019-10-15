import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';
import { ibanValidator } from './iban-validator';
import { terraDecimalValidator } from './terra-decimal-validator';
import { uniqueValuesValidator } from './unique-values-validator';

/**
 * Provides a set of additional validators used by form controls.
 *
 * A validator is a function that processes a FormControl or collection of
 * controls and returns a map of errors. A null map means that validation has passed.
 */
export class TerraValidators
{
    public static decimal(maxLength:number, decimals:number):ValidatorFn
    {
        return terraDecimalValidator(maxLength, decimals);
    }

    public static iban(control:AbstractControl):ValidationErrors | null
    {
        return ibanValidator(control);
    }

    public static uniqueValues(uniqueKeys?:Array<string>):ValidatorFn
    {
        return uniqueValuesValidator(uniqueKeys);
    }
}
