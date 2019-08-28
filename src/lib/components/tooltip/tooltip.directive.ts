import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';

import tippy from 'tippy.js';
import { isNullOrUndefined } from 'util';

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy, OnChanges
{
    /**
     * @description The tooltip text.
     */
    @Input()
    public tooltip:string;

    /**
     * @description Show the tooltip only when ellipsis is present.
     */
    @Input()
    public onlyEllipsisTooltip:boolean = false;

    private _isDisabled:boolean;
    private tooltipEl:any;

    /**
     * @deprecated since v4. The placement is calculated automatically now.
     * @param placement
     */
    @Input()
    public set placement(placement:string)
    {
        console.warn('`placement` is deprecated since v4. The placement is calculated automatically now.');
    }

    /**
     * @param disabled
     */
    @Input()
    public set isDisabled(disabled:boolean)
    {
        this._isDisabled = disabled;

        this.handleTooltipState();
    }

    constructor(private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        this.tooltipEl = tippy(this.elementRef.nativeElement, {
            content:  this.tooltip,
            trigger:  'manual',
            arrow:    true,
            boundary: 'window'
        });

        if(isNullOrUndefined(this.tooltip) || this.tooltip.length === 0)
        {
            this.isDisabled = true;
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('isDisabled'))
        {
            this.handleTooltipState();
        }
    }

    @HostListener('mouseout', ['$event'])
    public onMouseOut(event:MouseEvent):void
    {
        event.stopPropagation();
        if(!isNullOrUndefined(this.tooltipEl))
        {
            this.tooltipEl.hide(0);
        }
    }

    @HostListener('mouseover', ['$event'])
    public onMouseOver(event:MouseEvent):void
    {
        event.stopPropagation();
        if(!isNullOrUndefined(this.tooltipEl))
        {
            if(this.onlyEllipsisTooltip)
            {
                this.checkIfEllipsis();
            }

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

    private handleTooltipState():void
    {
        if(!isNullOrUndefined(this.tooltipEl))
        {
            if(this._isDisabled)
            {
                this.tooltipEl.disable();
            }
            else
            {
                this.tooltipEl.enable();
            }
        }
    }

    private checkIfEllipsis():void
    {
        let curOverflow:string = this.elementRef.nativeElement.style.overflow;

        // 'hide' overflow to get correct scrollWidth
        if(!curOverflow || curOverflow === 'visible')
        {
            this.elementRef.nativeElement.style.overflow = 'hidden';
        }

        // check if is overflowing
        let isOverflowing:boolean = this.elementRef.nativeElement.clientWidth < this.elementRef.nativeElement.scrollWidth;

        // 'reset' overflow to initial state
        this.elementRef.nativeElement.style.overflow = curOverflow;

        this.isDisabled = !isOverflowing;
    }
}
