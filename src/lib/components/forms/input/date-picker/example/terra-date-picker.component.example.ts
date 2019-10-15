import { Component } from '@angular/core';

@Component({
    selector: 'terra-date-picker-example',
    styleUrls: [ './terra-date-picker.component.example.scss'],
    templateUrl: './terra-date-picker.component.example.html',
})
export class TerraDatePickerComponentExample
{
    public _date:string = new Date().toDateString();

    public _onChange(value:string):void
    {
        console.log(value);
    }
}
