import {
    Component,
    ViewChild
} from '@angular/core';
import { TerraStopwatchComponent } from '../terra-stopwatch.component';

@Component({
    selector:    'terra-stopwatch-example',
    styleUrls:   ['./terra-stopwatch.component.example.scss'],
    templateUrl: './terra-stopwatch.component.example.html',
})
export class TerraStopwatchComponentExample
{
    @ViewChild('viewChildCurrentTime')
    public viewChildCurrentTime:TerraStopwatchComponent;

    protected showCurrentTimeInMilliseconds():void
    {
        alert(this.viewChildCurrentTime.getTimeInMilliseconds());
    }
}
