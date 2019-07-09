import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';

import tippy from 'tippy.js';
import { isNullOrUndefined } from 'util';

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy
{
    @Input()
    public tooltip:string;

    /**
     * @deprecated since the placement is calculated automatically now
     * @param placement
     */
    @Input()
    public set placement(placement:string)
    {
        // is not used anymore
    }

    private tooltipEl:any;

    constructor(private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        this.tooltipEl = tippy(this.elementRef.nativeElement, {
            content: this.tooltip,
            trigger: 'manual',
            arrow:   true
        });

        if(isNullOrUndefined(this.tooltip) || this.tooltip.length === 0)
        {
            this.tooltipEl.disable();
        }
    }

    @HostListener('mouseout')
    public onMouseOut():void
    {
        if(!isNullOrUndefined(this.tooltipEl))
        {
            this.tooltipEl.hide(0);
        }
    }

    @HostListener('mouseover')
    public onMouseOver():void
    {
        if(!isNullOrUndefined(this.tooltipEl))
        {
            this.tooltipEl.show(0);
        }
    }

    public ngOnDestroy():void
    {
        if(!isNullOrUndefined(this.tooltipEl))
        {
            this.tooltipEl.destroy();
        }
    }
}
