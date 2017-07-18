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
    private isLoading:boolean = false;
    public observable:Observable<boolean>;

    private _subscriber:Subscriber<boolean>;

    constructor(private zone:NgZone)
    {
        this.observable = new Observable<boolean>((subscriber:Subscriber<boolean>) =>
                                                  {
                                                      this._subscriber = subscriber;
                                                  });
    }

    public start():void
    {
        // check if currently not loading to reduce unnecessary change detections
        if(this._subscriber && !this.isLoading)
        {
            this.isLoading = true;
            this._subscriber.next(this.isLoading);
        }
    }

    public stop():void
    {
        // check if currently loading to reduce unnecessary change detections
        if(this._subscriber && this.isLoading)
        {
            this.isLoading = false;

            // to send no change detection run the setTimeout outside of angular
            this.zone.runOutsideAngular(() =>
                                        {
                                            // set timeout to stop the loading-spinner from blinking because of sequential started events
                                            setTimeout(() =>
                                                       {
                                                           if(!this.isLoading)
                                                           {
                                                               // run inside angular zone to detect changes from isLoading to false
                                                               this.zone.run(() =>
                                                                             {
                                                                                 this._subscriber.next(this.isLoading);
                                                                             });
                                                           }
                                                       }, 100);
                                        }
            )
        }
    }
}
