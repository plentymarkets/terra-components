import { Injectable } from '@angular/core';
import { TerraAlertInterface } from './data/terra-alert.interface';
import {
    isNull,
    isNullOrUndefined
} from 'util';

/**
 * @author mkunze
 */
@Injectable()
export class TerraAlertComponent
{
    private static instance:TerraAlertComponent = null;
    private static isCreating:boolean = false;

    public alerts:Array<TerraAlertInterface> = [];

    constructor()
    {
        if(!TerraAlertComponent.isCreating)
        {
            throw new Error('You can\'t call new in Singleton instances! Call TerraAlertComponent.getInstance() instead.');
        }
    }

    public static getInstance():TerraAlertComponent
    {
        if(isNull(TerraAlertComponent.instance))
        {
            TerraAlertComponent.isCreating = true;
            TerraAlertComponent.instance = new TerraAlertComponent();
            TerraAlertComponent.isCreating = false;
        }

        return TerraAlertComponent.instance;
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

        this.alerts.push({
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
