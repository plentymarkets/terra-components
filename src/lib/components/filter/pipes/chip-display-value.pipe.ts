import { Pipe, PipeTransform } from '@angular/core';
import { DisplayWithFn } from '../models';

/**
 * Transforms a value into a string using the given displayWith-function.
 * If no displayWith-function is given, the value will be transformed into a string using the native `toString()` method.
 */
@Pipe({
    name: 'chipDisplayValue'
})
export class ChipDisplayValuePipe implements PipeTransform {
    public transform(value: unknown, displayWith?: DisplayWithFn): string {
        return displayWith ? displayWith(value) : String(value);
    }
}
