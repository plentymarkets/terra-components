import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraLoadingBarService } from './service/terra-loading-bar.service';
import {
    TerraLoadingBarEvent,
    TerraLoadingBarEventType
} from './event/terra-loading-bar.event';

@Component({
    selector: 'terra-loading-bar',
    styles:   [require('./terra-loading-bar.component.scss')],
    template: require('./terra-loading-bar.component.html')
})
export class TerraLoadingBarComponent implements OnInit
{
    @Input() inputColor:string = 'black';
    @Input() inputHeight:string = '2px';
    @Input() inputShow:boolean = true;

    @Input()
    set progress(value:string)
    {
        if(value != null)
        {
            this._progress = value + '%';
        }
    }

    private _animationTime:number = 0.5;
    private _progress:string = '0%';

    get progress():string
    {
        return this._progress;
    }

    constructor(private service:TerraLoadingBarService)
    {
    }

    ngOnInit():any
    {
        this.service.observable.subscribe((event:TerraLoadingBarEvent) =>
        {
            if(event.type === TerraLoadingBarEventType.PROGRESS)
            {
                this.progress = event.value;
            }
            else if(event.type === TerraLoadingBarEventType.COLOR)
            {
                this.inputColor = event.value;
            }
            else if(event.type === TerraLoadingBarEventType.HEIGHT)
            {
                this.inputHeight = event.value;
            }
            else if(event.type === TerraLoadingBarEventType.VISIBLE)
            {
                this.inputShow = event.value;
            }
        });
    }
}
