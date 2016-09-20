import { Component } from '@angular/core';
import { PlentyAlert } from "./plenty-alert.component";

/**
 * @author mkunze
 */
@Component({
               selector: 'plenty-status',
               // templateUrl: 'plenty-alert-panel.component.html'
               template: `<alert *ngFor="let alert of alerts; let i = index" 
                                  [type]="alert.type" 
                                  (close)="closeAlert(i)" 
                                  [dismissible]="alert.closable" 
                                  [dismissOnTimeout]="alert.dismissOnTimeout">
                            {{ alert.msg }}
                          </alert>`
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
