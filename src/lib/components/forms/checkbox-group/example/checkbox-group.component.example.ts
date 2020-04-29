import { Component } from '@angular/core';

@Component({
    selector: 'tc-checkbox-group-example',
    templateUrl: './checkbox-group.component.example.html',
    styleUrls: ['./checkbox-group.component.example.scss']
})
export class CheckboxGroupComponentExample {
    public _values: Array<any> = [42];
    public _values2: Array<any> = [];

    public _isDisabled: boolean = false;

    public _checkboxes: Array<{ caption: string; value: any }> = [
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
