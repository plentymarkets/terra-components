import {
    EventEmitter,
    Inject,
    Injectable
} from '@angular/core';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertType } from './alert-type.enum';
import { IS_ROOT_WINDOW } from '../../utils/window';

@Injectable({
    providedIn: 'root'
})
export class AlertService
{
    /**
     * Notifies that an alert is supposed to be added
     */
    public addAlert:EventEmitter<TerraAlertInterface> = new EventEmitter<TerraAlertInterface>();
    /**
     * Notifies that an alert is supposed to be closed.
     */
    public closeAlert:EventEmitter<string> = new EventEmitter<string>();
    /**
     * Name of the CustomEvent that is dispatched to the parent window to add an alert
     */
    public readonly addEvent:string = 'addAlert';
    /**
     * Name of the CustomEvent that is dispatched to the parent window to close an alert
     */
    public readonly  closeEvent:string = 'closeAlert';

    private readonly defaultTimeout:number = 5000;

    constructor(@Inject(IS_ROOT_WINDOW) private isRootWindow:boolean)
    {}

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
            // it is used in the root window -> use EventEmitter to notify the alert panel directly.
            this.closeAlert.emit(identifier);
        }
        else
        {
            // it is used in an app that is hosted in an iframe -> use CustomEvent to notify the parent window.
            this.closeAlertForPlugin(identifier);
        }
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
            // it is used in the root window -> use EventEmitter to notify the alert panel directly.
            this.addAlert.emit(alert);
        }
        else
        {
            // it is used in an app that is hosted in an iframe -> use CustomEvent to notify the parent window.
            this.addAlertForPlugin(alert);
        }
    }

    private addAlertForPlugin(alert:TerraAlertInterface):void
    {
        let event:CustomEvent<TerraAlertInterface> = new CustomEvent<TerraAlertInterface>(this.addEvent, {
            detail: alert,
            bubbles: false
        });
        window.parent.window.dispatchEvent(event);
    }

    private closeAlertForPlugin(identifier:string):void
    {
        let event:CustomEvent<string> = new CustomEvent<string>(this.closeEvent, {
            detail: identifier,
            bubbles: false
        });
        window.parent.window.dispatchEvent(event);
    }
}
