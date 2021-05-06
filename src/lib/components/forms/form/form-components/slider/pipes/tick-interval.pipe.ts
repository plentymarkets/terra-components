import { Pipe, PipeTransform } from '@angular/core';

/** @description
 * A pipe that returns how often to show ticks. It's related to the step so that a tick always appears on a step.
 * A tick can be set by an interval. If the interval is undefined, the ticks will be calculated automatically.
 * If showTicks is false, the interval will be set to 0. */
@Pipe({
    name: 'tickInterval'
})
export class TickIntervalPipe implements PipeTransform {
    public transform(showTicks: boolean, interval: number): number | 'auto' {
        return showTicks ? (interval ? 1 : 'auto') : 0;
    }
}
