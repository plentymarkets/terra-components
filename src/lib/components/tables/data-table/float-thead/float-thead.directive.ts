import {
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import * as jQuery from 'jquery';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterEvent
} from '@angular/router';
import { filter } from 'rxjs/internal/operators';
import { ActivatedRouteHelper } from '../../../../helpers/index';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

require('./floatThead.js');

@Directive({
    selector: 'table[floatThead]'
})
export class FloatTheadDirective implements OnInit, OnDestroy
{
    /**
     * @description if set to true the float thead will be applied.
     * @default false
     */
    @Input()
    public floatThead:boolean = false;

    private navigationSubscription:Subscription;

    constructor(private elementRef:ElementRef, private router:Router, private activatedRoute:ActivatedRoute)
    {
    }

    public ngOnInit():void
    {
        if(this.floatThead)
        {
            this.initStickyTableHeader(true);

            this.navigationSubscription = this.router.events.pipe(filter((event:RouterEvent) => event instanceof NavigationEnd))
                                              .subscribe((event:NavigationEnd) =>
                                              {
                                                  // re-initialize floatThead on tab switch to check header position
                                                  if(event.url === ActivatedRouteHelper.getBasePathForActivatedRoute(this.activatedRoute.snapshot))
                                                  {
                                                      this.initStickyTableHeader();
                                                  }
                                              });
        }
    }

    public ngOnDestroy():void
    {
        if(!isNullOrUndefined(this.navigationSubscription))
        {
            this.navigationSubscription.unsubscribe();
        }
    }

    private initStickyTableHeader(addScrollEvent?:boolean):void
    {
        const tableElement:any = jQuery(this.elementRef.nativeElement);
        const overflowContainer:JQuery<HTMLElement> = tableElement.closest('.overflow-auto');

        if(overflowContainer.length === 0)
        {
            console.error('floatThead needs an overflow-auto container. Please add a div with overflow-auto style.');
            return;
        }

        const stickyOffset:number = overflowContainer.offset().top;

        tableElement.floatThead('destroy');
        tableElement.floatThead({
            responsiveContainer: function(table:JQuery<HTMLElement>):JQuery<HTMLElement>
                                 {
                                     return table.closest('.table-responsive');
                                 },
            position:            'fixed',
            zIndex:              '2',
            top:                 stickyOffset
        });

        if(addScrollEvent)
        {
            overflowContainer.scroll(function():void
            {
                tableElement.floatThead('reflow');
            });
        }
    }
}
