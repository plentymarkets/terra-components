import { Injectable } from '@angular/core';
import { TerraAlertInterface } from './data/terra-alert.interface';

/**
 * @author mkunze
 */
@Injectable()
export class TerraAlertComponent
{
    private _alerts:Array<TerraAlertInterface> = [];
    private static _instance:TerraAlertComponent = null;
    private static _isCreating:Boolean = false;

    constructor()
    {
        if(!TerraAlertComponent._isCreating)
        {
            throw new Error("You can't call new in Singleton instances! Call TerraAlertComponent.getInstance() instead.");
        }
    }

    public static getInstance():TerraAlertComponent
    {
        if(TerraAlertComponent._instance == null)
        {
            TerraAlertComponent._isCreating = true;
            TerraAlertComponent._instance = new TerraAlertComponent();
            TerraAlertComponent._isCreating = false;
        }

        return TerraAlertComponent._instance;
    }

    public closeAlert(i:number):void
    {
        this._alerts.splice(i, 1);
    }

    public addAlert(alert:TerraAlertInterface):void
    {
        if(alert.dismissOnTimeout == null)
        {
            alert.dismissOnTimeout = 5000;
        }

        this._alerts.push({
                              msg:              alert.msg,
                              closable:         alert.closable,
                              type:             alert.type,
                              dismissOnTimeout: alert.dismissOnTimeout,
                              identifier:       alert.identifier
                          });
    }

    public closeAlertByIdentifier(identifier:string)
    {
        for(let alert of this._alerts)
        {
            if(alert.identifier == identifier)
            {
                let index = this._alerts.indexOf(alert);

                this.closeAlert(index);
            }
        }
    }

    public get alerts():Array<TerraAlertInterface>
    {
        return this._alerts;
    }

    public set alerts(value:Array<TerraAlertInterface>)
    {
        this._alerts = value;
    }
}
