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
import { Observable } from 'rxjs/Observable';
import { TwoColumnHelper } from '../../../helpers/two-column.helper';
import { TerraTwoColumnsConfig } from './config/terra-two-columns.config';
import { TerraTwoColumnsContainerComponent } from './terra-two-columns-container.component';

@Directive({
    selector: 'terra-2-col[mobileRouting]'
})
export class TerraTwoColumnsContainerDirective implements OnInit, OnDestroy
{
    public subscription:any;

    private basePath:string;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private twoColumnsConfig:TerraTwoColumnsConfig,
                @Host() @Optional() private twoColComponent:TerraTwoColumnsContainerComponent)
    {
        this.basePath = router.url;
    }

    public ngOnInit():void
    {
        let subscribable:Observable<Event> = this.router.events.filter((event:RouterEvent) =>
        {
            return event instanceof NavigationEnd && event.urlAfterRedirects === this.basePath;
        });

        this.subscription = subscribable.subscribe((event:NavigationEnd) =>
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

        this.setColumnHidden('left');

        this.route.data.subscribe((data:Data) =>
        {
            this.basePath = this.router.url;
        });
    }

    public ngOnDestroy():void
    {
        this.subscription.unsubscribe();
    }

    private setColumnHidden(column:string):void
    {
        if(column === 'right')
        {
            this.twoColComponent.leftColumn = TwoColumnHelper.leftRightColXS()
                                                         + TwoColumnHelper.leftColMD(this.twoColumnsConfig.component.leftColumnWidth)
                                                         + TwoColumnHelper.leftColLG(this.twoColumnsConfig.component.leftColumnWidth);
            this.twoColComponent.rightColumn = TwoColumnHelper.leftRightHiddenXS()
                                                          + TwoColumnHelper.rightColMD(this.twoColumnsConfig.component.leftColumnWidth)
                                                          + TwoColumnHelper.rightColLG(this.twoColumnsConfig.component.leftColumnWidth);
        }
        else if(column === 'left')
        {
            this.twoColComponent.leftColumn = TwoColumnHelper.leftRightHiddenXS()
                                                         + TwoColumnHelper.leftColMD(this.twoColumnsConfig.component.leftColumnWidth)
                                                         + TwoColumnHelper.leftColLG(this.twoColumnsConfig.component.leftColumnWidth);
            this.twoColComponent.rightColumn = TwoColumnHelper.leftRightColXS()
                                                          + TwoColumnHelper.rightColMD(this.twoColumnsConfig.component.leftColumnWidth)
                                                          + TwoColumnHelper.rightColLG(this.twoColumnsConfig.component.leftColumnWidth);
        }
    }
}
