import { Component } from '@angular/core';
import { TerraTagInterface } from '../../tag/data/terra-tag.interface';
import { TerraButtonInterface } from '../../../../../';

@Component({
               selector: 'terra-info-box-example',
               styles:   [require('./terra-info-box.component.example.scss')],
               template: require('./terra-info-box.component.example.html')
           })
export class TerraInfoboxComponentExample
{
    public tagList:Array<TerraTagInterface> = [];
    public buttonList:Array<TerraButtonInterface> = [];

    constructor()
    {
        this.tagList.push(
            {
                badge: 'Terra',
                color: 'green'
            },
            {
                badge: 'Plenty',
                color: 'red'
            });
        this.buttonList.push(
            {
                caption:       'Terra',
                icon:          'icon-plugin_not_productive',
                clickFunction: ():void => this.clickFunction('Terra')
            }, {
                caption:       'Terra',
                icon:          'icon-plugin_not_productive',
                isTertiary: true,
                clickFunction: ():void => this.clickFunction('Terra')
            });
    }

    public clickFunction(clickedButton:string):void
    {
        alert(clickedButton + ' clicked');
    }
}
