import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertService } from './alert.service';

/**
 * @author mkunze
 */
@Component({
    selector:    'terra-alert-panel',
    templateUrl: './terra-alert-panel.component.html',
    styleUrls:   ['./terra-alert-panel.component.scss'],
})
export class TerraAlertPanelComponent implements OnInit, OnDestroy
{
    /** @description List of alerts that are currently shown in the panel. */
    public _alerts:Array<TerraAlertInterface> = [];

    private _addAlertSub:Subscription;
    private _closeAlertSub:Subscription;

    private readonly _addAlertListener:EventListener;
    private readonly _closeAlertListener:EventListener;

    constructor(private _service:AlertService)
    {
        // init event listeners
        this._addAlertListener = (event:CustomEvent<TerraAlertInterface>):void => this._add(event.detail);
        this._closeAlertListener = (event:CustomEvent<string>):void => this.closeAlertByIdentifier(event.detail);
    }

    public ngOnInit():void
    {
        // listen to the EventEmitters of the service
        this._addAlertSub = this._service.addAlert.subscribe((alert:TerraAlertInterface) => this._add(alert));
        this._closeAlertSub = this._service.closeAlert.subscribe((identifier:string) => this.closeAlertByIdentifier(identifier));

        // listen to events that concern _alerts and are dispatched to the hosting window
        window.addEventListener(this._service.addEvent, this._addAlertListener);
        window.addEventListener(this._service.closeEvent, this._closeAlertListener);
    }

    public ngOnDestroy():void
    {
        // unsubscribe to the EventEmitters of the service
        this._addAlertSub.unsubscribe();
        this._closeAlertSub.unsubscribe();

        // remove listeners from the hosting window
        window.removeEventListener(this._service.addEvent, this._addAlertListener);
        window.removeEventListener(this._service.closeEvent, this._closeAlertListener);
    }

    /** @description Closes a given alert reference. */
    public _closeAlert(alert:TerraAlertInterface):void
    {
        const index:number = this._alerts.indexOf(alert);
        this._closeAlertByIndex(index);
    }

    /**
     * @description Closes the alert at the given index.
     * @internal
     */
    public _closeAlertByIndex(index:number):void
    {
        this._alerts.splice(index, 1);
    }

    /** @description Closes the first alert that matches the given identifier. */
    private closeAlertByIdentifier(identifier:string):void
    {
        const index:number = this._alerts.findIndex((alert:TerraAlertInterface) => alert.identifier === identifier);
        this._closeAlertByIndex(index);
    }

    private _add(alert:TerraAlertInterface):void
    {
        // add the alert
        this._alerts.unshift(alert);

        // close the alert automatically after the given period of time
        if(alert.dismissOnTimeout > 0)
        {
            setTimeout(() => this._closeAlert(alert), alert.dismissOnTimeout);
        }
    }
}
