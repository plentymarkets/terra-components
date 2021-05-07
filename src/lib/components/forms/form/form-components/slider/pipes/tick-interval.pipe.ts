import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe that determines the tick interval for the material slider.
 * Depending on the given interval and the flag showTicks 0, 1 or 'auto' is returned.
 */
@Pipe({
    name: 'tickInterval'
})
export class TickIntervalPipe implements PipeTransform {
    public transform(showTicks: boolean, interval: number): 0 | 1 | 'auto' {
        return showTicks ? (interval ? 1 : 'auto') : 0;
    }
}
