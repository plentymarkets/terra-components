import {
    EventEmitter,
    Injectable
} from '@angular/core';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertType } from './alert-type.enum';

@Injectable()
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

    private readonly defaultTimeout:number = 5000;

    /**
     * add a success alert
     * @param message
     * @param identifier
     */
    public success(message:string, identifier?:string):void
    {
        this.add(message, AlertType.success, this.defaultTimeout, identifier);
    }

    /**
     * add an error alert
     * @param message
     * @param identifier
     */
    public error(message:string, identifier?:string):void
    {
        this.add(message, AlertType.error, 0, identifier);
    }

    /**
     * add an info alert
     * @param message
     * @param identifier
     */
    public info(message:string, identifier?:string):void
    {
        this.add(message, AlertType.info, this.defaultTimeout, identifier);
    }

    /**
     * add a warning alert
     * @param message
     * @param identifier
     */
    public warning(message:string, identifier?:string):void
    {
        this.add(message, AlertType.warning, this.defaultTimeout, identifier);
    }

    /**
     * Close an alert by its identifier
     * @param identifier
     */
    public close(identifier:string):void
    {
        this.closeAlert.emit(identifier);
    }

    private add(msg:string, type:AlertType, timeout:number, identifier?:string):void
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
            // it is used in the root window -> use EventEmitter to notify the alert panel.
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
        let event:CustomEvent<TerraAlertInterface> = new CustomEvent('addAlert', {
            detail: alert,
            bubbles: false
        });

        window.parent.window.dispatchEvent(event);
    }

    /**
     * checks whether this service is used in the root window
     */
    private get isRootWindow():boolean
    {
        return window === window.parent;
    }

}
