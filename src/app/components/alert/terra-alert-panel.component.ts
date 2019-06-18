import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { TerraAlertComponent } from './terra-alert.component';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';

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
export class TerraAlertPanelComponent implements OnInit, OnDestroy
{
    /**
     * @description Notifies whenever an alert is closed.
     */
    @Output()
    public closed:EventEmitter<string> = new EventEmitter<string>();

    protected alerts:Array<TerraAlertInterface>;
    private alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    private addAlertSub:Subscription;
    private closeAlertSub:Subscription;

    private readonly addAlertListener:EventListener;
    private readonly closeAlertListener:EventListener;

    constructor(private service:AlertService)
    {
        this.alerts = this.alert.alerts;

        // init event listeners
        this.addAlertListener = (event:CustomEvent<TerraAlertInterface>):void => this.addAlert(event.detail);
        this.closeAlertListener = (event:CustomEvent<string>):void => this.closeAlert(event.detail);
    }

    public ngOnInit():void
    {
        // listen to the EventEmitters of the service
        this.addAlertSub = this.service.addAlert.subscribe((alert:TerraAlertInterface) => this.addAlert(alert));
        this.closeAlertSub = this.service.closeAlert.subscribe((identifier:string) => this.closeAlert(identifier));

        // listen to events that concern alerts and are dispatched to the hosting window
        window.addEventListener(this.service.addEvent, this.addAlertListener);
        window.addEventListener(this.service.closeEvent, this.closeAlertListener);
    }

    public ngOnDestroy():void
    {
        // unsubscribe to the EventEmitters of the service
        this.addAlertSub.unsubscribe();
        this.closeAlertSub.unsubscribe();

        // remove listeners from the hosting window
        window.removeEventListener(this.service.addEvent, this.addAlertListener);
        window.removeEventListener(this.service.closeEvent, this.closeAlertListener);
    }

    protected closeAlertByIndex(index:number):void
    {
        const identifier:string = this.alerts[index].identifier;

        this.closed.emit(identifier);
        this.alert.closeAlert(index);
    }

    private addAlert(alert:TerraAlertInterface):void
    {
        this.alert.addAlert(alert);
    }

    private closeAlert(identifier:string):void
    {
        this.closed.emit(identifier);
        this.alert.closeAlertByIdentifier(identifier);
    }
}
