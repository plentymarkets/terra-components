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
        this.addAlert.emit({
            msg:              msg,
            type:             type,
            dismissOnTimeout: timeout,
            identifier:       identifier
        });
    }

    // TODO: Handle this automatically
    private addAlertForPlugin(alert:TerraAlertInterface):void
    {
        let event:CustomEvent = new CustomEvent('status', {
            detail: {
                message:          alert.msg,
                type:             alert.type,
                dismissOnTimeout: alert.dismissOnTimeout,
                identifier:       alert.identifier
            }
        });

        window.parent.window.dispatchEvent(event);
    }

}
