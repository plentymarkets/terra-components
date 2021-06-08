import { Pipe, PipeTransform } from '@angular/core';
import { DisplayWhenFn } from '../models';

/**
 * Determines whether a chip should be displayed depending on its value and a given displayWhen-function.
 * If no displayWhen-function is given, the chip will be shown when the value is neither `null` nor `undefined`.
 */
@Pipe({
    name: 'chipDisplayWhen'
})
export class ChipDisplayWhenPipe implements PipeTransform {
    public transform(value: unknown, displayWhen?: DisplayWhenFn): boolean {
        return displayWhen ? displayWhen(value) : !(value === null || value === undefined);
    }
}
