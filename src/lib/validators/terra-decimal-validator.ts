import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNullOrUndefined } from 'util';

/**
 * @author mfrank
 */
const separator: string = '.';
const maxSplitParts: number = 2;
const beforeSeparator: number = 0;
const afterSeparator: number = 1;

export function terraDecimalValidator(maxLength: number, decimals: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: number = control.value as number;
        if (!isNullOrUndefined(value)) {
            const splitValue: Array<string> = value.toString().split(separator);
            const invalidSeparatorCount: boolean = splitValue.length > maxSplitParts;
            const invalidMaxLengthBeforeSeparator: boolean = splitValue[beforeSeparator].length > maxLength - decimals;
            const invalidMaxLengthAfterSeparator: boolean = isNullOrUndefined(splitValue[afterSeparator])
                ? false
                : splitValue[afterSeparator].length > decimals;

            if (invalidSeparatorCount) {
                return { terraDecimal: 'Invalid amount of separators' };
            }

            if (invalidMaxLengthBeforeSeparator) {
                return { terraDecimal: 'Invalid max length before separator' };
            }

            if (invalidMaxLengthAfterSeparator) {
                return { terraDecimal: 'Invalid max length after separator' };
            }
        }

        return null;
    };
}
