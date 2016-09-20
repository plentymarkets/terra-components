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
               selector:  'plenty-loading-bar',
               // templateUrl: 'plenty-loading-bar.component.html',
               styleUrls: ['plenty-loading-bar.component.css'],
               template:  `<div class="loading-bar">
                              <div class="loading-bar-progress"
                                   [style.width]="progress"
                                   [style.backgroundColor]="color"
                                   [style.color]="color"
                                   [style.height]="height"
                                   [style.opacity]="show ? '1' : '0'"
                                   [style.-webkit-transition]="'all ' + animationTime + 's ease-in-out'"
                                   [style.-moz-transition]="'all ' + animationTime + 's ease-in-out'"
                                   [style.-o-transition]="'all ' + animationTime + 's ease-in-out'"
                                   [style.transition]="'all ' + animationTime + 's ease-in-out'"></div>
                            </div>`
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
