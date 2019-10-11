import {
    AbstractControl,
    ValidatorFn
} from '@angular/forms';

export function uniqueCombinationValidator(control:AbstractControl):ValidatorFn
{
    return (control:AbstractControl):{ [key:string]:any } | null =>
    {
        let seen:Set<unknown> = new Set();
        const hasDuplicates:boolean = (control.value as Array<unknown>).some((currentObject:unknown) =>
        {
            return seen.size === seen.add(currentObject).size;
        });

        return hasDuplicates ? {'uniqueCombination': {value: control.value}} : null;
    };
}
