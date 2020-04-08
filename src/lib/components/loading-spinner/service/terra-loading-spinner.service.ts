import {
    Inject,
    Injectable,
    NgZone
} from '@angular/core';
import {
    Observable,
    Subscriber
} from 'rxjs';
import { IS_ROOT_WINDOW } from '../../../utils/window';

/**
 * @author mscharf
 */
@Injectable({
    providedIn: 'root'
})
export class TerraLoadingSpinnerService
{
    public observable:Observable<boolean>;

    private _isLoading:boolean = false;
    private subscriber:Subscriber<boolean>;

    constructor(private zone:NgZone,
                @Inject(IS_ROOT_WINDOW) private isRootWindow:boolean)
    {
        this.observable = new Observable<boolean>((subscriber:Subscriber<boolean>):void =>
        {
            this.subscriber = subscriber;
        });
    }

    public start():void
    {
        // check if currently not loading to reduce unnecessary change detections
        if(this.subscriber && !this._isLoading)
        {
            this._isLoading = true;
            this.notify(this._isLoading);
        }
    }

    public stop():void
    {
        // check if currently loading to reduce unnecessary change detections
        if(this.subscriber && this._isLoading)
        {
            this._isLoading = false;

            // to send no change detection run the setTimeout outside of angular
            this.zone.runOutsideAngular(() => this.runOutsideAngular());
        }
    }

    public get isLoading():boolean
    {
        return this._isLoading;
    }

    private runOutsideAngular():void
    {
        // set timeout to stop the loading-spinner from blinking because of sequential started events
        setTimeout(() =>
        {
            if(!this._isLoading)
            {
                // run inside angular zone to detect changes from isLoading to false
                this.zone.run(() =>
                {
                    this.notify(this._isLoading);
                });
            }
        }, 100);
    }

    private notify(isLoading:boolean):void
    {
        this.subscriber.next(isLoading);
        // also dispatch event to the parent windows if the current one is not the root
        if(!this.isRootWindow)
        {
            window.dispatchEvent(new CustomEvent<boolean>('loadingStatus', {detail: isLoading, bubbles: true}));
        }
    }
}
