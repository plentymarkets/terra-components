import {
    Component,
    ViewChild
} from '@angular/core';
import { TerraStopwatchComponent } from '../terra-stopwatch.component';

@Component({
    selector: 'terra-stopwatch-example',
    styles:   [require('./terra-stopwatch.component.example.scss')],
    template: require('./terra-stopwatch.component.example.html'),
})
export class TerraStopwatchComponentExample
{
    @ViewChild('viewChildCurrentTime')
        public viewChildCurrentTime:TerraStopwatchComponent;

    protected showCurrentTimeInSeconds():void
    {
        alert(this.viewChildCurrentTime.getTimeInSeconds());
    }
}
