import { Injectable } from '@angular/core';
import {
    Observable,
    Subscriber
} from 'rxjs';

/**
 * @author mscharf
 */
@Injectable()
export class TerraLoadingSpinnerService
{
    public observable:Observable<boolean>;
    
    private _subscriber:Subscriber<boolean>;
    
    constructor()
    {
        
        this.observable = new Observable<boolean>((subscriber:Subscriber<boolean>) =>
                                                  {
                                                      this._subscriber = subscriber;
                                                  });
        
    }
    
    public start():void
    {
        if(this._subscriber)
        {
            this._subscriber.next(true);
        }
    }
    
    public stop():void
    {
        if(this._subscriber)
        {
            this._subscriber.next(false);
        }
    }
}
