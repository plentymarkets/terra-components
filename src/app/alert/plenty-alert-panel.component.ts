import { Component } from '@angular/core';
import { PlentyAlert } from "./plenty-alert.component";

/**
 * @author mkunze
 */
@Component({
               moduleId:    module.id,
               selector:    'plenty-status',
               templateUrl: 'plenty-alert-panel.html'
           })
export class PlentyAlertPanel
{
    private alerts: Array<any>;
    private alert: PlentyAlert = PlentyAlert.getInstance();

    constructor()
    {
        this.alerts = this.alert.alerts;
    }

    private closeAlert(i: number): void
    {
        this.alert.closeAlert(i);
    }
}
