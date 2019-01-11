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

    public handleMessage(message:string, identifier?:string):void
    {
        this.add({
            msg:              message,
            type:             AlertType.success,
            dismissOnTimeout: this.defaultTimeout,
            identifier:       identifier
        });
    }

    public handleError(message:string, identifier?:string):void
    {
        this.add({
            msg:              message,
            type:             AlertType.error,
            dismissOnTimeout: 0,
            identifier:       identifier
        });
    }

    public handleInfo(message:string, identifier?:string):void
    {
        this.add({
            msg:              message,
            type:             AlertType.info,
            dismissOnTimeout: this.defaultTimeout,
            identifier:       identifier
        });
    }

    public handleWarning(message:string, identifier?:string):void
    {
        this.add({
            msg:              message,
            type:             AlertType.warning,
            dismissOnTimeout: this.defaultTimeout,
            identifier:       identifier
        });
    }

    /** @description is used to add an alert*/
    private add(alert:TerraAlertInterface):void
    {
        this.addAlert.emit(alert);
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
