import { Component } from '@angular/core';
// import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { PlentyAlert } from "./plenty-alert.component";

/**
 * @author mkunze
 */
@Component({
               moduleId:    module.id,
               selector:    'plenty-status',
               templateUrl: 'plenty-alert-panel.html',
               // directives:  [AlertComponent],
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
