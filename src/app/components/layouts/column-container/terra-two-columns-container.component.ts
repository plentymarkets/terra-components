import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Route,
    Router,
    RouterEvent,
    Routes
} from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Event } from '@angular/router/src/events';
import { Observable } from 'rxjs/Observable';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-2-col',
    styles:   [require('./terra-two-columns-container.component.scss')],
    template: require('./terra-two-columns-container.component.html')
})
export class TerraTwoColumnsContainerComponent implements OnDestroy, OnInit
{
    protected leftColumn:string;
    protected rightColumn:string;

    private readonly colXS:string = 'col-xs-12';
    private readonly colMD:string = 'col-md-';
    private readonly colLG:string = 'col-lg-';
    private readonly spacer:string = ' ';
    private readonly maxColumnWidth:number = 12;
    private _leftColumnWidth:number = 2;
    private subscription:any;

    @Input() private config:any;

    @Input()
    public set leftColumnWidth(leftColumnWidth:number)
    {
        if(leftColumnWidth > 12 || leftColumnWidth < 1)
        {
            console.error('Given value for Input leftColumnWidth is lower than 1 or greater than 12. ' +
                          'It has been limited to this range to prevent invalid rendering. Please check your input value to avoid this error.');
        }

        this._leftColumnWidth = Math.min(this.maxColumnWidth, Math.max(1, leftColumnWidth));

        this.leftColumn = this.leftRightColXS() + this.leftColMD() + this.leftColLG();
        this.rightColumn = this.leftRightColXS() + this.rightColMD() + this.rightColLG();
    }

    constructor(private route:ActivatedRoute,
                private router:Router)
    {
        this.leftColumn = 'hidden-xs ' + this.leftColMD() + this.leftColLG();
        this.rightColumn = this.leftRightColXS() + this.rightColMD() + this.rightColLG();

        let subscribable:Observable<Event> = this.router.events.filter((event:RouterEvent) =>
        {
            return event instanceof NavigationEnd;
        });

        this.subscription = subscribable.subscribe((event:NavigationEnd) =>
        {
            if(!isNullOrUndefined(this.config))
            {
                if(!isNullOrUndefined(this.config.initialPath)
                   && event.urlAfterRedirects.startsWith(this.config.initialPath))
                {
                    this.leftColumn = this.leftRightColXS() + this.leftColMD() + this.leftColLG();
                    this.rightColumn = this.leftRightColXS() + this.rightColMD() + this.rightColLG();

                    if(event.url !== event.urlAfterRedirects)
                    {
                        this.leftColumn = this.leftRightColXS() + this.leftColMD() + this.leftColLG();
                        this.rightColumn = 'hidden-xs ' + this.rightColMD() + this.rightColLG();
                    }
                    else
                    {
                        this.leftColumn = 'hidden-xs ' + this.leftColMD() + this.leftColLG();
                        this.rightColumn = this.leftRightColXS() + this.rightColMD() + this.rightColLG();
                    }
                }
            }
        });

        this.leftColumnWidth = this._leftColumnWidth; // trigger calculation for default values
    }

    public ngOnInit():void
    {
        this.leftColumn = 'hidden-xs ' + this.leftColMD() + this.leftColLG();
        this.rightColumn = this.leftRightColXS() + this.rightColMD() + this.rightColLG();
    }

    public ngOnDestroy():void
    {
        this.subscription.unsubscribe();
    }

    private leftRightColXS():string
    {
        return this.colXS + this.spacer;
    }

    private leftColMD():string
    {
        return this.colMD + this.calculatedLeftColumnMDWidth() + this.spacer;
    }

    private leftColLG():string
    {
        return this.colLG + this._leftColumnWidth;
    }

    private rightColMD():string
    {
        return this.colMD + this.calculatedRightColumnMDWidth() + this.spacer;
    }

    private rightColLG():string
    {
        return this.colLG + this.calculatedRightColumnLGWidth();
    }

    private calculatedLeftColumnMDWidth():number
    {
        return (this._leftColumnWidth === this.maxColumnWidth) ? this._leftColumnWidth : this._leftColumnWidth + 1;
    }

    private calculatedRightColumnMDWidth():number
    {
        return this.maxColumnWidth - this.calculatedLeftColumnMDWidth();
    }

    private calculatedRightColumnLGWidth():number
    {
        return this.maxColumnWidth - this._leftColumnWidth;
    }
}
