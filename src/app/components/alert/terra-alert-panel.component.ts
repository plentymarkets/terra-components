import { Component } from '@angular/core';
import { TerraAlertComponent } from './terra-alert.component';
import { TerraAlertInterface } from './data/terra-alert.interface';

/**
 * @author mkunze
 */
@Component({
    selector: 'terra-alert-panel',
    styles:   [
        require('./terra-alert-panel.component.scss'),
        require('./terra-alert-panel.component.glob.scss').toString()
    ],
    template: require('./terra-alert-panel.component.html')
})

export class TerraAlertPanelComponent
{
    protected alerts:Array<TerraAlertInterface>;
    private alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor()
    {
        this.alerts = this.alert.alerts;
    }

    private closeAlert(i:number):void
    {
        this.alert.closeAlert(i);
    }
}
