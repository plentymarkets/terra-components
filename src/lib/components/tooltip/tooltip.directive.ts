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

import tippy, { Placement } from 'tippy.js';
import { isNullOrUndefined } from 'util';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';

@Directive({
    selector: '[tcTooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy, OnChanges
{
    /**
     * @description The tooltip text.
     */
    @Input()
    public tcTooltip:string;

    /**
     * @description Show the tooltip only when ellipsis is present. Default false.
     */
    @Input()
    public onlyEllipsisTooltip:boolean = false;

    private _isDisabled:boolean;
    private tooltipEl:any;
    private _placement:string = TerraPlacementEnum.TOP;

    /**
     * @deprecated since v4. The placement is calculated automatically now.
     * @param placement
     */
    @Input()
    public set placement(placement:string)
    {
        console.warn('`placement` is deprecated since v4. The placement is calculated automatically now.');

        this._placement = placement;
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
            content:   this.tcTooltip,
            trigger:   'manual',
            arrow:     true,
            boundary:  'window',
            placement: this._placement as Placement
        });

        if(isNullOrUndefined(this.tcTooltip) || this.tcTooltip.length === 0)
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

        if(changes.hasOwnProperty('tooltip'))
        {
            if(!isNullOrUndefined(this.tooltipEl))
            {
                this.tooltipEl.content = this.tcTooltip;
            }
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
