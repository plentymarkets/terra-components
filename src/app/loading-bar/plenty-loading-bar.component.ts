import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    PlentyLoadingBarService,
    PlentyLoadingBarEvent,
    PlentyLoadingBarEventType
} from './service/plenty-loading-bar.service';

@Component({
               selector: 'plenty-loading-bar',
               templateUrl: './plenty-loading-bar.component.html',
               styleUrls: ['./plenty-loading-bar.component.css']
           })
export class PlentyLoadingBar implements OnInit
{

    private animationTime: number = 0.5;
    private _progress: string = '0%';
    @Input() set progress(value: string)
    {
        if(value != null)
        {
            this._progress = value + '%';
        }
    }

    get progress(): string
    {
        return this._progress;
    }

    @Input() color: string = 'black';
    @Input() height: string = '2px';
    @Input() show: boolean = true;

    constructor(private service: PlentyLoadingBarService)
    {
    }

    ngOnInit(): any
    {
        this.service.observable.subscribe((event: PlentyLoadingBarEvent) =>
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
