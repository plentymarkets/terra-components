import { Component } from '@angular/core';
import { PlentyAlert } from "./plenty-alert.component";
import { require } from '@types/node';

/**
 * @author mkunze
 */
@Component({
               selector: 'plenty-alert-panel',
               styles:   [require('./plenty-alert-panel.component.scss')],
               template: require('./plenty-alert-panel.component.html')
           })
export class PlentyAlertPanel
{
    private alerts:Array<any>;
    private alert:PlentyAlert = PlentyAlert.getInstance();

    constructor()
    {
        this.alerts = this.alert.alerts;
    }

    private closeAlert(i:number):void
    {
        this.alert.closeAlert(i);
    }
}
