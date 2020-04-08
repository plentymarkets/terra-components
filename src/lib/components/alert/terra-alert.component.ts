import { TerraAlertInterface } from './data/terra-alert.interface';
import {
    isNull,
    isNullOrUndefined
} from 'util';

/**
 * @author mkunze
 * @deprecated use AlertService instead
 */
export class TerraAlertComponent
{
    private static _instance:TerraAlertComponent = null;
    private static _isCreating:boolean = false;

    public alerts:Array<TerraAlertInterface> = [];

    constructor()
    {
        if(!TerraAlertComponent._isCreating)
        {
            throw new Error('You can\'t call new in Singleton instances! Call TerraAlertComponent.getInstance() instead.');
        }
    }

    public static getInstance():TerraAlertComponent
    {
        if(isNull(TerraAlertComponent._instance))
        {
            TerraAlertComponent._isCreating = true;
            TerraAlertComponent._instance = new TerraAlertComponent();
            TerraAlertComponent._isCreating = false;
        }

        return TerraAlertComponent._instance;
    }

    public closeAlert(i:number):void
    {
        this.alerts.splice(i, 1);
    }

    public addAlertForPlugin(alert:TerraAlertInterface):void
    {
        if(isNullOrUndefined(alert.dismissOnTimeout))
        {
            alert.dismissOnTimeout = 5000;
        }

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

    /** @description is used to add an alert*/
    public addAlert(alert:TerraAlertInterface):void
    {
        if(isNullOrUndefined(alert.dismissOnTimeout))
        {
            alert.dismissOnTimeout = 5000;
        }

        this.alerts.unshift({
            msg:              alert.msg,
            type:             alert.type,
            dismissOnTimeout: alert.dismissOnTimeout,
            identifier:       alert.identifier
        });
    }

    public closeAlertByIdentifier(identifier:string):void
    {
        for(let alert of this.alerts)
        {
            if(alert.identifier === identifier)
            {
                let index:number = this.alerts.indexOf(alert);

                this.closeAlert(index);
            }
        }
    }
}
