import { Component } from '@angular/core';

@Component({
    selector: 'terra-stopwatch-example',
    styles:   [require('./terra-stopwatch.component.example.scss')],
    template: require('./terra-stopwatch.component.example.html'),
})
export class TerraStopwatchComponentExample
{
    protected currentValue:number = 0;
}
