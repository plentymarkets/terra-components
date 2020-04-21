import {
    EventEmitter,
    Inject,
    Injectable,
    OnDestroy
} from '@angular/core';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertType } from './alert-type.enum';
import { IS_ROOT_WINDOW } from '../../utils/window';

@Injectable({
    providedIn: 'root'
})
export class AlertService implements OnDestroy
{
    /** @description List of alerts that are currently shown in the panel. */
    public alerts:Array<TerraAlertInterface> = [];
    /**
     * @deprecated since v6. Will be removed in a future major release.
     * @description Notifies that an alert is supposed to be added
     */
    public addAlert:EventEmitter<TerraAlertInterface> = new EventEmitter<TerraAlertInterface>();
    /**
     * @deprecated since v6. Will be removed in a future major release.
     * @description Notifies that an alert is supposed to be closed.
     */
    public closeAlert:EventEmitter<string> = new EventEmitter<string>();

    /** @description Name of the CustomEvent that is dispatched to the parent window to add an alert. */
    public readonly addEvent:string = 'addAlert';
    /** @description Name of the CustomEvent that is dispatched to the parent window to close an alert. */
    public readonly  closeEvent:string = 'closeAlert';

    private readonly _addAlertListener:EventListener;
    private readonly _closeAlertListener:EventListener;


    private readonly defaultTimeout:number = 5000;

    constructor(@Inject(IS_ROOT_WINDOW) private isRootWindow:boolean)
    {
        // init event listeners
        this._addAlertListener = (event:CustomEvent<TerraAlertInterface>):void => this._add(event.detail.msg, event.detail.type, event.detail.dismissOnTimeout, event.detail.identifier);
        this._closeAlertListener = (event:CustomEvent<string>):void => this.close(event.detail);

        // listen to events that concern alerts and are dispatched to the hosting window
        window.addEventListener(this.addEvent, this._addAlertListener);
        window.addEventListener(this.closeEvent, this._closeAlertListener);
    }

    public ngOnDestroy():void
    {
        // remove listeners from the hosting window
        window.removeEventListener(this.addEvent, this._addAlertListener);
        window.removeEventListener(this.closeEvent, this._closeAlertListener);
    }

    /**
     * add a success alert
     * @param message
     * @param identifier
     */
    public success(message:string, identifier?:string):void
    {
        this._add(message, AlertType.success, this.defaultTimeout, identifier);
    }

    /**
     * add an error alert
     * @param message
     * @param identifier
     */
    public error(message:string, identifier?:string):void
    {
        this._add(message, AlertType.error, 0, identifier);
    }

    /**
     * add an info alert
     * @param message
     * @param identifier
     */
    public info(message:string, identifier?:string):void
    {
        this._add(message, AlertType.info, this.defaultTimeout, identifier);
    }

    /**
     * add a warning alert
     * @param message
     * @param identifier
     */
    public warning(message:string, identifier?:string):void
    {
        this._add(message, AlertType.warning, this.defaultTimeout, identifier);
    }

    /**
     * Close an alert by its identifier
     * @param identifier
     */
    public close(identifier:string):void
    {
        // check whether the service is used in the root window or in an iframe
        if(this.isRootWindow)
        {
            // close alert
            this.closeAlertsByIdentifier(identifier);
            // it is used in the root window -> use EventEmitter to notify the alert panel directly.
            this.closeAlert.emit(identifier);
        }
        else
        {
            // it is used in an app that is hosted in an iframe -> use CustomEvent to notify the parent window.
            this.closeAlertForPlugin(identifier);
        }
    }

    /** @description Closes an alert by its index in the list of shown alerts. */
    public closeAlertByIndex(index:number):void
    {
        this.alerts.splice(index, 1);
    }

    /** @description Closes all alerts matching the given identifier */
    public closeAlertsByIdentifier(identifier:string):void
    {
        this.alerts.forEach((alert:TerraAlertInterface, index:number) =>
        {
            if(alert.identifier === identifier)
            {
                this.closeAlertByIndex(index);
            }
        });
    }

    private _add(msg:string, type:AlertType, timeout:number, identifier?:string):void
    {
        let alert:TerraAlertInterface = {
            msg:              msg,
            type:             type,
            dismissOnTimeout: timeout,
            identifier:       identifier
        };

        // check whether the service is used in the root window or in an iframe
        if(this.isRootWindow)
        {
            // add the alert
            this.alerts.unshift(alert);
            // it is used in the root window -> use EventEmitter to notify the alert panel directly.
            this.addAlert.emit(alert);
        }
        else
        {
            // it is used in an app that is hosted in an iframe -> use CustomEvent to notify the parent window.
            this.addAlertForPlugin(alert);
        }
    }

    /** @description Dispatches event to the parent window indicating that an alert should be added. */
    private addAlertForPlugin(alert:TerraAlertInterface):void
    {
        const event:CustomEvent<TerraAlertInterface> = new CustomEvent<TerraAlertInterface>(this.addEvent, {
            detail: alert,
            bubbles: false
        });
        window.parent.window.dispatchEvent(event);
    }

    /** @description Dispatches event to the parent window indicating that an alert should be closed. */
    private closeAlertForPlugin(identifier:string):void
    {
        const event:CustomEvent<string> = new CustomEvent<string>(this.closeEvent, {
            detail: identifier,
            bubbles: false
        });
        window.parent.window.dispatchEvent(event);
    }
}
