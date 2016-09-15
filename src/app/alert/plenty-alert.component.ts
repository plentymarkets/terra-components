import { Injectable } from '@angular/core';

/**
 * @author mkunze
 */
@Injectable()
export class PlentyAlert
{
  private _alerts:Array<any> = [];
  private static instance:PlentyAlert = null;
  private static isCreating:Boolean = false;

  constructor()
  {
    if(!PlentyAlert.isCreating)
    {
      throw new Error("You can't call new in Singleton instances! Call PlentyAlert.getInstance() instead.");
    }
  }

  public static getInstance():PlentyAlert
  {
    if(PlentyAlert.instance == null)
    {
      PlentyAlert.isCreating = true;
      PlentyAlert.instance = new PlentyAlert();
      PlentyAlert.isCreating = false;
    }

    return PlentyAlert.instance;
  }

  public closeAlert(i:number):void
  {
    this._alerts.splice(i, 1);
  }

  public addAlert(message:string,
                  closable:boolean,
                  type:string,
                  timeout?:number,
                  identifier?:string):void
  {
    if(timeout == null)
    {
      timeout = 5000;
    }

    this._alerts.push({ msg:             message,
                        closable:         closable,
                        type:             type,
                        dismissOnTimeout: timeout,
                        identifier:       identifier
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

  public get alerts():Array<any>
  {
    return this._alerts;
  }

  public set alerts(value:Array<any>)
  {
    this._alerts = value;
  }
}
