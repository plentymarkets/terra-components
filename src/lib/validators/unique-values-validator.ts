import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';
import { isNullOrUndefined } from 'util';

export function uniqueValuesValidator(uniqueKeys?:Array<string>):ValidatorFn
{
    return (control:AbstractControl):ValidationErrors | null =>
    {
        let seen:Set<unknown> = new Set();
        const hasDuplicates:boolean = (control.value as Array<unknown>).some((currentObject:unknown) =>
        {
            if(!isNullOrUndefined(currentObject) && typeof currentObject ===  'object')
            {
                return seen.size === seen.add(
                    Object.keys(currentObject)
                          .filter((key:string) => uniqueKeys.includes(key))
                          .map((key:string) => currentObject[key]).join(', ')
                ).size;
            }
            else
            {
                return seen.size === seen.add(currentObject).size;
            }
        });

        return hasDuplicates ? {'uniqueCombination': {value: control.value}} : null;
    };
}
