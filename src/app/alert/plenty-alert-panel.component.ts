import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { PlentyAlert } from "./plenty-alert.component";

/**
 * @author mkunze
 */
@Component({
               selector: 'plenty-alert-panel',
               styles: [require('./plenty-alert-panel.component.scss').toString()],
               template: require('./plenty-alert-panel.component.html'),
               encapsulation: ViewEncapsulation.None
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
