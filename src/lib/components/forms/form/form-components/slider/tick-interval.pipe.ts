import { Pipe, PipeTransform } from '@angular/core';

/** */
@Pipe({
    name: 'tickInterval'
})
export class TickIntervalPipe implements PipeTransform {
    public transform(showTicks: boolean, interval: number): number | 'auto' {
        return showTicks ? (interval ? 1 : 'auto') : 0;
    }
}
