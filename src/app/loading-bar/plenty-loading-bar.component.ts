import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    PlentyLoadingBarService
} from './service/plenty-loading-bar.service';
import {
    PlentyLoadingBarEvent,
    PlentyLoadingBarEventType
} from './event/plenty-loading-bar-event';

@Component({
               selector: 'plenty-loading-bar',
               styles:   [require('./plenty-loading-bar.component.scss').toString()],
               template: require('./plenty-loading-bar.component.html')
           })
export class PlentyLoadingBar implements OnInit
{

    private animationTime:number = 0.5;
    private _progress:string = '0%';
    @Input() set progress(value:string)
    {
        if(value != null)
        {
            this._progress = value + '%';
        }
    }

    get progress():string
    {
        return this._progress;
    }

    @Input() color:string = 'black';
    @Input() height:string = '2px';
    @Input() show:boolean = true;

    constructor(private service:PlentyLoadingBarService)
    {
    }

    ngOnInit():any
    {
        this.service.observable.subscribe((event:PlentyLoadingBarEvent) =>
                                          {
                                              if(event.type === PlentyLoadingBarEventType.PROGRESS)
                                              {
                                                  this.progress = event.value;
                                              }
                                              else if(event.type === PlentyLoadingBarEventType.COLOR)
                                              {
                                                  this.color = event.value;
                                              }
                                              else if(event.type === PlentyLoadingBarEventType.HEIGHT)
                                              {
                                                  this.height = event.value;
                                              }
                                              else if(event.type === PlentyLoadingBarEventType.VISIBLE)
                                              {
                                                  this.show = event.value;
                                              }
                                          });
    }

}
