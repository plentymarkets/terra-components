import {
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
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

import * as jQuery_ from 'jquery';
const jQuery:JQueryStatic = jQuery_;

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
    private tableElement:any;

    constructor(private elementRef:ElementRef, private router:Router, private activatedRoute:ActivatedRoute)
    {
    }

    public ngOnInit():void
    {
        if(this.floatThead)
        {
            this.tableElement = jQuery(this.elementRef.nativeElement);

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
        const overflowContainer:JQuery<HTMLElement> = this.tableElement.closest('.overflow-auto');

        if(overflowContainer.length === 0)
        {
            console.error('floatThead needs an overflow-auto container. Please add a div with overflow-auto style.');
            return;
        }

        const stickyOffset:number = overflowContainer.offset().top;

        this.tableElement.floatThead('destroy');
        this.tableElement.floatThead({
            responsiveContainer: (table:JQuery<HTMLElement>):JQuery<HTMLElement> =>
                                 {
                                     return table.closest('.table-responsive');
                                 },
            position:            'fixed',
            zIndex:              '2',
            top:                 stickyOffset
        });

        if(addScrollEvent)
        {
            overflowContainer.on('scroll', ():void =>
            {
                this.tableElement.floatThead('reflow');
            });
        }
    }
}
