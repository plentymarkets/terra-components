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
    @Input()
    public tooltip:string;

    private _disabled:boolean;
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
        this._disabled = disabled;
    }

    constructor(private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        this.tooltipEl = tippy(this.elementRef.nativeElement, {
            content: this.tooltip,
            trigger: 'manual',
            arrow:   true,
            boundary: 'window'
        });

        if(isNullOrUndefined(this.tooltip) || this.tooltip.length === 0)
        {
            this.isDisabled = true;

            this.handleTooltipState();
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
            if(this._disabled)
            {
                this.tooltipEl.disable();
            }
            else
            {
                this.tooltipEl.enable();
            }
        }
    }
}
