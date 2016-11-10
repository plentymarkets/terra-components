import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { TerraAlertComponent } from "./terra-alert.component";
import { TerraAlertInterface } from './data/terra-alert.interface';

/**
 * @author mkunze
 */
@Component({
               selector:      'terra-alert-panel',
               styles:        [require('./terra-alert-panel.component.scss').toString()],
               template:      require('./terra-alert-panel.component.html'),
               encapsulation: ViewEncapsulation.None
           })
export class TerraAlertPanelComponent
{
    private _alerts:Array<TerraAlertInterface>;
    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();
    
    constructor()
    {
        this._alerts = this._alert.alerts;
    }
    
    private closeAlert(i:number):void
    {
        this._alert.closeAlert(i);
    }
}
