import {
    EventEmitter,
    Injectable
} from '@angular/core';
import { TerraAlertInterface } from './data/terra-alert.interface';

export enum AlertType
{
    info = 'info',
    warning = 'warning',
    error = 'danger',
    success = 'success'
}

@Injectable()
export class AlertService
{
    public addAlert:EventEmitter<TerraAlertInterface> = new EventEmitter<TerraAlertInterface>();
    public closeAlert:EventEmitter<string> = new EventEmitter<string>();

    private readonly defaultTimeout:number = 5000;

    constructor()
    {}

    /**
     * add a success alert
     * @param message
     * @param identifier
     */
    public success(message:string, identifier?:string):void
    {
        this.add(message, AlertType.success, identifier, this.defaultTimeout);
    }

    /**
     * add an error alert
     * @param message
     * @param identifier
     */
    public error(message:string, identifier?:string):void
    {
        this.add(message, AlertType.error, identifier, 0);
    }

    /**
     * add an info alert
     * @param message
     * @param identifier
     */
    public info(message:string, identifier?:string):void
    {
        this.add( message, AlertType.info, identifier, this.defaultTimeout);
    }

    /**
     * add a warning alert
     * @param message
     * @param identifier
     */
    public warning(message:string, identifier?:string):void
    {
        this.add( message, AlertType.warning, identifier, this.defaultTimeout);
    }

    /** @description is used to add an alert*/
    private add(msg:string, type:AlertType, identifier:string, timeout:number):void
    {
        this.addAlert.emit({
            msg:              msg,
            type:             type,
            identifier:       identifier,
            dismissOnTimeout: timeout
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

    public close(identifier:string):void
    {
        this.closeAlert.emit(identifier);
    }
}
