import { Component } from '@angular/core';

@Component({
    selector: 'tc-checkbox-group-example',
    templateUrl: './checkbox-group.component.example.html',
    styleUrls: [ './checkbox-group.component.example.scss']
})
export class CheckboxGroupComponentExample
{
    protected values:Array<any> = [];
    protected values2:Array<any> = [];

    protected isDisabled:boolean = false;

    protected checkboxes:Array<{caption:string, value:any}> = [
        {
            caption: 'Checkbox A',
            value: 42
        },
        {
            caption: 'Checkbox B',
            value: 'Hello'
        },
        {
            caption: 'Checkbox C',
            value: 'World'
        }
    ];
}
