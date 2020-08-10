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
    public alerts:Array<TerraAlertInterface> = [];

    private static _instance:TerraAlertComponent = null;
    private static _isCreating:boolean = false;

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

    /**
     * @description Closes an alert by its index.
     * @deprecated use closeAlertByIndex instead. */
    public closeAlert(i:number):void
    {
        this.closeAlertByIndex(i);
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

        this.alerts.unshift(alert);

        if(alert.dismissOnTimeout > 0)
        {
            setTimeout(() => this.closeAlertByRef(alert), alert.dismissOnTimeout);
        }
    }

    /** @description Closes an alert by its index. */
    public closeAlertByIndex(index:number):void
    {
        this.alerts.splice(index, 1);
    }

    /** @description Closes an alert by reference. */
    public closeAlertByRef(alert:TerraAlertInterface):void
    {
        if(this.alerts.includes(alert))
        {
            this.closeAlertByIndex(this.alerts.indexOf(alert));
        }
    }

    /** @description Closes an alert by its identifier. */
    public closeAlertByIdentifier(identifier:string):void
    {
        for(let alert of this.alerts)
        {
            if(alert.identifier === identifier)
            {
                let index:number = this.alerts.indexOf(alert);

                this.closeAlertByIndex(index);
            }
        }
    }
}
