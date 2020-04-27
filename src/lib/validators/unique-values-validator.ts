import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export function uniqueValuesValidator(uniqueKeys?: Array<string>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let seen: Set<unknown> = new Set();
    const hasDuplicates: boolean = (control.value as Array<unknown>).some((value: unknown) => {
      if (!isNullOrUndefined(value) && typeof value === 'object') {
        return (
          seen.size ===
          seen.add(
            Object.keys(value)
              .filter((key: string) => uniqueKeys.includes(key))
              .map((key: string) => value[key])
              .join(', ')
          ).size
        );
      } else {
        return seen.size === seen.add(value).size;
      }
    });

    return hasDuplicates ? { uniqueCombination: { value: control.value } } : null;
  };
}
