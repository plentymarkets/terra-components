import { Injectable } from '@angular/core';
import { PlentyAlertInterface } from './data/plenty-alert.interface';

/**
 * @author mkunze
 */
@Injectable()
export class PlentyAlert
{
    private _alerts:Array<PlentyAlertInterface> = [];
    private static _instance:PlentyAlert = null;
    private static _isCreating:Boolean = false;
    
    constructor()
    {
        if(!PlentyAlert._isCreating)
        {
            throw new Error("You can't call new in Singleton instances! Call PlentyAlert.getInstance() instead.");
        }
    }
    
    public static getInstance():PlentyAlert
    {
        if(PlentyAlert._instance == null)
        {
            PlentyAlert._isCreating = true;
            PlentyAlert._instance = new PlentyAlert();
            PlentyAlert._isCreating = false;
        }
        
        return PlentyAlert._instance;
    }
    
    public closeAlert(i:number):void
    {
        this._alerts.splice(i, 1);
    }
    
    public addAlert(alert:PlentyAlertInterface):void
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
    
    public get alerts():Array<PlentyAlertInterface>
    {
        return this._alerts;
    }
    
    public set alerts(value:Array<PlentyAlertInterface>)
    {
        this._alerts = value;
    }
}
