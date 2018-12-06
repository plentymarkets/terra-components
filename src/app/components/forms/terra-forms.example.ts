import { Component } from '@angular/core';
import { TerraSelectBoxValueInterface } from './select-box/data/terra-select-box.interface';
import { TerraMultiCheckBoxValueInterface } from './multi-check-box/data/terra-multi-check-box-value.interface';

@Component({
    selector: 'terra-forms-example',
    template: require('./terra-forms.example.html')
})

export class TerraFormsExampleComponent
{
    protected radioValue:number = 1;
    protected readonly listBoxValues:Array<TerraSelectBoxValueInterface> = [
        {
            caption: '',
            value:   null
        },
        {
            caption: '1',
            value:   1
        },
        {
            caption: '2',
            value:   2
        }
    ];

    protected readonly multiCheckboxValues:Array<TerraMultiCheckBoxValueInterface> =
        [
            {
                value:    '1',
                caption:  'Value 1',
                selected: false
            },
            {
                value:    '2',
                caption:  'Value 2',
                selected: true
            },
            {
                value:    '3',
                caption:  'Value 3',
                selected: true
            },
            {
                value:    '4',
                caption:  'Value 4',
                selected: false
            },
            {
                value:    '5',
                caption:  'Value 5',
                selected: false
            }
        ];

    protected submit():void
    {
        // implement submit routine here
    }
}
