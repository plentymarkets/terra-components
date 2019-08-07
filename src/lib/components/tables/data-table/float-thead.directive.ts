import {
    Directive,
    ElementRef,
    Input,
    OnInit
} from '@angular/core';
require('./lib/floatThead.js');
import * as jQuery from 'jquery';

@Directive({
    selector: '[floatThead]'
})
export class FloatTheadDirective implements OnInit
{
    @Input()
    public floatThead:boolean;

    constructor(private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        if(this.floatThead)
        {
            this.initStickyTableHeader();
        }
    }

    public initStickyTableHeader():void
    {
        const tableElement:any = jQuery(this.elementRef.nativeElement);
        const overflowContainer:JQuery<HTMLElement> = tableElement.closest('.overflow-auto');
        const stickyOffset:number = overflowContainer.offset().top;

        if (overflowContainer.length > 0)
        {
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

            overflowContainer.scroll(function():void
            {
                tableElement.trigger('reflow');
            });
        }
    }
}
