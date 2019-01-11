import { Component,
    OnInit } from '@angular/core';
import { TerraAlertComponent } from './terra-alert.component';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertService } from './alert.service';
import { isNullOrUndefined } from "util";

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
export class TerraAlertPanelComponent implements OnInit
{
    protected alerts:Array<TerraAlertInterface>;
    private alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(private service:AlertService)
    {
        this.alerts = this.alert.alerts;
    }

    public ngOnInit():void
    {
        this.service.addAlert.subscribe((alert:TerraAlertInterface) => this.addAlert(alert));
        this.service.closeAlert.subscribe((identifier:string) => this.closeAlert(identifier));
    }

    private addAlert(alert:TerraAlertInterface):void
    {
        this.alert.addAlert(alert);
    }

    private closeAlert(identifier:string):void
    {
        this.alert.closeAlertByIdentifier(identifier);
    }
}
