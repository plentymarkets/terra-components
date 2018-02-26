import { Component } from '@angular/core';
import { TerraTagInterface } from '../../tag/data/terra-tag.interface';

@Component({
    selector: 'terra-info-box-example',
    styles:   [require('./terra-info-box.component.example.scss')],
    template: require('./terra-info-box.component.example.html')
})
export class TerraInfoboxComponentExample
{
    tagList:Array<TerraTagInterface> = [
        {
            badge: 'tag1'
        }
    ];

    clickFunction(clickedButton:string):void
    {
        alert(clickedButton + ' clicked');
    }
}
