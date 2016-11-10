import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { PlentyAlert } from "./plenty-alert.component";
import { PlentyAlertInterface } from './data/plenty-alert.interface';

/**
 * @author mkunze
 */
@Component({
               selector:      'terra-alert-panel',
               styles:        [require('./plenty-alert-panel.component.scss').toString()],
               template:      require('./plenty-alert-panel.component.html'),
               encapsulation: ViewEncapsulation.None
           })
export class PlentyAlertPanel
{
    private _alerts:Array<PlentyAlertInterface>;
    private _alert:PlentyAlert = PlentyAlert.getInstance();
    
    constructor()
    {
        this._alerts = this._alert.alerts;
    }
    
    private closeAlert(i:number):void
    {
        this._alert.closeAlert(i);
    }
}
