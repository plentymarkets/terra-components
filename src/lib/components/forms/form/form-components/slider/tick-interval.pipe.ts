import { Pipe, PipeTransform } from '@angular/core';

/** @description A pipe, that returns how often to show ticks. Relative to the step so that a tick always appears on a step. */
@Pipe({
    name: 'tickInterval'
})
export class TickIntervalPipe implements PipeTransform {
    public transform(showTicks: boolean, interval: number): number | 'auto' {
        return showTicks ? (interval ? 1 : 'auto') : 0;
    }
}
