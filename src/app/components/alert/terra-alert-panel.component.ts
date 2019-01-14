import {
    Component,
    OnInit
} from '@angular/core';
import { TerraAlertComponent } from './terra-alert.component';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertService } from './alert.service';

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
        // listen to the EventEmitters of the service
        this.service.addAlert.subscribe((alert:TerraAlertInterface) => this.addAlert(alert));
        this.service.closeAlert.subscribe((identifier:string) => this.closeAlert(identifier));

        // listen to events concerning alerts that are dispatched to the hosting window
        window.addEventListener(this.service.addEvent, (event:CustomEvent<TerraAlertInterface>) => this.addAlert(event.detail));
        window.addEventListener(this.service.closeEvent, (event:CustomEvent<string>) => this.closeAlert(event.detail));
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
