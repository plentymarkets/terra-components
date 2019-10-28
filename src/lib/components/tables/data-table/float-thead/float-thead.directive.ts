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

    constructor(private _elementRef:ElementRef,
                private _router:Router,
                private _activatedRoute:ActivatedRoute)
    {
    }

    public ngOnInit():void
    {
        if(this.floatThead)
        {
            this.tableElement = jQuery(this._elementRef.nativeElement);

            this._initStickyTableHeader(true);

            this.navigationSubscription = this._router.events.pipe(filter((event:RouterEvent) => event instanceof NavigationEnd))
                                              .subscribe((event:NavigationEnd) =>
                                              {
                                                  // re-initialize floatThead on tab switch to check header position
                                                  if(event.url === ActivatedRouteHelper.getBasePathForActivatedRoute(this._activatedRoute.snapshot))
                                                  {
                                                      this._initStickyTableHeader();
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

    private _initStickyTableHeader(addScrollEvent?:boolean):void
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
