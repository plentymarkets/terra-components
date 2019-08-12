import {
    Directive,
    Host,
    OnDestroy,
    OnInit,
    Optional
} from '@angular/core';
import {
    ActivatedRoute,
    Data,
    NavigationEnd,
    Router,
    RouterEvent
} from '@angular/router';
import { Event } from '@angular/router/src/events';
import { TwoColumnHelper } from '../../../../helpers/two-column.helper';
import { TerraTwoColumnsContainerComponent } from './terra-two-columns-container.component';
import {
    Observable,
    Subscription
} from 'rxjs';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from '../../../../helpers/null-checker';

@Directive({
    selector: 'terra-2-col[mobileRouting]'
})
export class TerraTwoColumnsContainerDirective implements OnInit, OnDestroy
{
    private basePath:string;
    private dataSub:Subscription;
    private eventsSub:Subscription;

    constructor(private route:ActivatedRoute,
                private router:Router,
                @Host() @Optional() private twoColComponent:TerraTwoColumnsContainerComponent)
    {
        this.basePath = router.url;
    }

    public ngOnInit():void
    {
        let navigationEndEvents$:Observable<Event> = this.router.events.pipe(filter((event:RouterEvent) =>
        {
            return event instanceof NavigationEnd && event.urlAfterRedirects === this.basePath;
        }));

        this.eventsSub = navigationEndEvents$.subscribe((event:NavigationEnd) =>
        {
            if(event.url !== event.urlAfterRedirects)
            {
                this.setColumnHidden('right');
            }
            else
            {
                this.setColumnHidden('left');
            }
        });

        this.dataSub = this.route.data.subscribe((data:Data) =>
        {
            this.basePath = this.router.url;
        });

        this.setColumnHidden('left');
    }

    public ngOnDestroy():void
    {
        this.eventsSub.unsubscribe();
        this.dataSub.unsubscribe();
    }

    private setColumnHidden(column:string):void
    {
        if(!isNullOrUndefined(this.twoColComponent))
        {
            if(column === 'right')
            {
                this.twoColComponent.leftColumn = TwoColumnHelper.leftRightColXS()
                                                  + TwoColumnHelper.leftColMD(this.twoColComponent.leftColumnWidth)
                                                  + TwoColumnHelper.leftColLG(this.twoColComponent.leftColumnWidth);
                this.twoColComponent.rightColumn = TwoColumnHelper.leftRightHiddenXS()
                                                   + TwoColumnHelper.rightColMD(this.twoColComponent.leftColumnWidth)
                                                   + TwoColumnHelper.rightColLG(this.twoColComponent.leftColumnWidth);
            }
            else if(column === 'left')
            {
                this.twoColComponent.leftColumn = TwoColumnHelper.leftRightHiddenXS()
                                                  + TwoColumnHelper.leftColMD(this.twoColComponent.leftColumnWidth)
                                                  + TwoColumnHelper.leftColLG(this.twoColComponent.leftColumnWidth);
                this.twoColComponent.rightColumn = TwoColumnHelper.leftRightColXS()
                                                   + TwoColumnHelper.rightColMD(this.twoColComponent.leftColumnWidth)
                                                   + TwoColumnHelper.rightColLG(this.twoColComponent.leftColumnWidth);
            }
        }
    }
}
