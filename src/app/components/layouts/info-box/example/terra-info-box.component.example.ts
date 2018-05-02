import { Component } from '@angular/core';
import { TerraTagInterface } from '../../tag/data/terra-tag.interface';

@Component({
    selector: 'terra-info-box-example',
    styles:   [require('./terra-info-box.component.example.scss')],
    template: require('./terra-info-box.component.example.html')
})
export class TerraInfoboxComponentExample
{
    public tagList:Array<TerraTagInterface> = [
        {
            badge: 'Terra',
            color: 'green'
        },
        {
            badge: 'Plenty',
            color: 'red'
        }
    ];

    public clickFunction(clickedButton:string):void
    {
        alert(clickedButton + ' clicked');
    }
}
