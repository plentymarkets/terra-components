import { Component } from '@angular/core';
import { TerraButtonInterface } from '../../button/data/terra-button.interface';


@Component({
    selector: 'terra-button-with-options-example',
    styles:   [require('./terra-button-with-options.component.example.scss')],
    template: require('./terra-button-with-options.component.example.html'),
})
export class TerraButtonWithOptionsComponentExample
{
    protected buttonOptionList:Array<TerraButtonInterface> = [
        {
            caption:       'Add new account',
            icon:          'icon-add',
            clickFunction: ():void => console.log('add')
        },
        {
            isDivider:     true,
            clickFunction: null
        },
        {
            caption:       'Delete all accounts',
            icon:          'icon-delete',
            clickFunction: ():void => console.log('delete')
        }
    ];
}
