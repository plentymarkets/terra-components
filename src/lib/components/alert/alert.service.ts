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
    providedIn: 'root' // TODO: We may change this to platform in Angular v9!?
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
        this._addAlertListener = (event:CustomEvent<TerraAlertInterface>):void => this.addAlertFromEvent(event);
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
     * @description Closes the first alert that matches the given identifier.
     * @param identifier
     */
    public close(identifier:string):void
    {
        // close alert
        this.closeAlertByIdentifier(identifier);

        // notify
        this.notifyOnClose(identifier);
    }

    /**
     * @description Closes the alert at the given index.
     * @internal
     */
    public _closeAlertByIndex(index:number):void
    {
        this.alerts.splice(index, 1);
    }

    /** @description Closes the first alert that matches the given identifier. */
    private closeAlertByIdentifier(identifier:string):void
    {
        const index:number = this.alerts.findIndex((alert:TerraAlertInterface) => alert.identifier === identifier);
        this._closeAlertByIndex(index);
    }

    /** @description Closes a given alert reference. */
    private closeAlertByReference(alert:TerraAlertInterface):void
    {
        const index:number = this.alerts.indexOf(alert);
        this._closeAlertByIndex(index);
    }

    private _add(msg:string, type:AlertType, timeout:number, identifier?:string):void
    {
        let alert:TerraAlertInterface = {
            msg:              msg,
            type:             type,
            dismissOnTimeout: timeout,
            identifier:       identifier
        };

        // add the alert
        this.alerts.unshift(alert);

        // close the alert automatically after the given period of time
        if(timeout > 0)
        {
            setTimeout(() => this.closeAlertByReference(alert), timeout);
        }

        this.notifyOnAdd(alert);
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

    /** @description Adds an alert that has been passed via a custom event. */
    private addAlertFromEvent(event:CustomEvent<TerraAlertInterface>):void
    {
        this._add(event.detail.msg, event.detail.type, event.detail.dismissOnTimeout, event.detail.identifier);
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

    /** @description Notifies whenever an alert has been added. */
    private notifyOnAdd(alert:TerraAlertInterface):void
    {
        // check whether the service is used in the root window or in an iframe
        if(this.isRootWindow)
        {
            // it is used in the root window -> use EventEmitter to notify the alert panel directly.
            this.addAlert.emit(alert);
        }
        else
        {
            // it is used in an app that is hosted in an iframe -> use CustomEvent to notify the parent window.
            this.addAlertForPlugin(alert);
        }
    }

    /** @description Notifies whenever an alert has been closed. */
    private notifyOnClose(identifier:string):void
    {
        // check whether the service is used in the root window or in an iframe
        if(this.isRootWindow)
        {
            // it is used in the root window -> use EventEmitter to notify the alert panel directly.
            this.closeAlert.emit(identifier);
        }
        else
        {
            // it is used in an app that is hosted in an iframe -> use CustomEvent to notify the parent window.
            this.closeAlertForPlugin(identifier);
        }
    }
}
