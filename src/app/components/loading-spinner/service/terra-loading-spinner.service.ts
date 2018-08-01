import {
    Injectable,
    NgZone
} from '@angular/core';
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

    private _isLoading:boolean = false;
    private _subscriber:Subscriber<boolean>;

    constructor(private zone:NgZone)
    {
        this.observable = new Observable<boolean>((subscriber:Subscriber<boolean>):void =>
        {
            this._subscriber = subscriber;
        });
    }

    public start():void
    {
        // check if currently not loading to reduce unnecessary change detections
        if(this._subscriber && !this._isLoading)
        {
            this._isLoading = true;
            this._subscriber.next(this._isLoading);
        }
    }

    public stop():void
    {
        // check if currently loading to reduce unnecessary change detections
        if(this._subscriber && this._isLoading)
        {
            this._isLoading = false;

            // to send no change detection run the setTimeout outside of angular
            this.zone.runOutsideAngular(() =>
                {
                    // set timeout to stop the loading-spinner from blinking because of sequential started events
                    setTimeout(() =>
                    {
                        if(!this._isLoading)
                        {
                            // run inside angular zone to detect changes from isLoading to false
                            this.zone.run(() =>
                            {
                                this._subscriber.next(this._isLoading);
                            });
                        }
                    }, 100);
                }
            );
        }
    }

    public get isLoading():boolean
    {
        return this._isLoading;
    }
}
