import { Component } from '@angular/core';
import { Time } from '@angular/common';

@Component({
    selector: 'tc-time-picker-example',
    templateUrl: './time-picker.component.example.html'
})
export class TimePickerExampleComponent
{
    public time:Time;

    constructor()
    {
        const now:Date = new Date();
        this.time = {
            hours: now.getHours(),
            minutes: now.getMinutes()
        };
    }
}
