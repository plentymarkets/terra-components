import {
    AfterViewInit,
    Directive,
    ElementRef,
    OnInit
} from '@angular/core';
require('./lib/floatThead.js');
import * as jQuery from 'jquery';

@Directive({
    selector: '[floatThead]'
})
export class FloatTheadDirective implements OnInit
{
    constructor(private elementRef:ElementRef)
    {
    }

    ngOnInit():void
    {
        this.initStickyTableHeader();
    }

    public initStickyTableHeader():void
    {
        const tableElement:any = jQuery(this.elementRef.nativeElement);
        var overflowContainer = tableElement.closest('.overflow-auto');
        var stickyOffset = overflowContainer.offset().top;

        if (overflowContainer.length > 0)
        {
            tableElement.floatThead('destroy');
            tableElement.floatThead({
                responsiveContainer: function($table)
                                     {
                                         return $table.closest(".table-responsive");
                                     },
                position:            'fixed',
                zIndex:              '2',
                top:                 stickyOffset
            });

            overflowContainer.scroll(function()
            {
                tableElement.trigger('reflow');
            });
        }
    }
}
