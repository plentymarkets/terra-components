import { Component } from '@angular/core';
import { Time } from '@angular/common';

@Component({
    selector: 'terra-time-picker-example',
    styleUrls: [ './terra-time-picker.component.example.scss'],
    templateUrl: './terra-time-picker.component.example.html',
})
export class TerraTimePickerComponentExample
{
    public _time:Time = undefined;
    public _timeAsDate:Date;

    public convertTimeToDate(time:Time):Date
    {
        const date:Date = new Date();
        date.setHours(time.hours);
        date.setMinutes(time.minutes);
        return date;
    }
}
