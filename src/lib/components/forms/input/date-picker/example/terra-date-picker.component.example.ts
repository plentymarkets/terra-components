import { Component } from '@angular/core';

@Component({
    selector: 'terra-date-picker-example',
    styles:   [require('./terra-date-picker.component.example.scss')],
    template: require('./terra-date-picker.component.example.html'),
})
export class TerraDatePickerComponentExample
{
    protected date:string = new Date().toDateString();

    protected onChange(value:string):void
    {
        console.log(value);
    }
}
