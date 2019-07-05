import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import Tooltip from 'tooltip.js';
import { Placement } from 'popper.js';
import { isNullOrUndefined } from 'util';


@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy
{
    @Input()
    public tooltip:string;

    @Input()
    public set placement(placement:Placement)
    {
        // TODO maybe add automatic positioning
        if(placement !== null && placement !== undefined && placement.length !== 0)
        {
            if(this._placement !== placement && this.tooltipEl !== null && this.tooltipEl !== undefined)
            {
                this.tooltipEl.dispose();
                this.createTooltip(placement);
            }

            this._placement = placement;
        }
        else
        {
            this._placement = 'top';
        }
    }

    private tooltipEl:Tooltip;
    private _placement:Placement;

    constructor(private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        this.createTooltip(this._placement);
    }

    @HostListener('mouseout')
    public onMouseOut():void
    {
        this.tooltipEl.dispose();
    }

    @HostListener('mouseover')
    public onMouseOver():void
    {
        this.tooltipEl.show();
    }

    @HostListener('mouseup')
    public onMouseUp():void
    {
        this.tooltipEl.dispose();
    }

    public ngOnDestroy():void
    {
        this.tooltipEl.dispose();
    }

    private createTooltip(placement:Placement):void
    {
        this.tooltipEl = new Tooltip(this.elementRef.nativeElement, {
            placement: placement,
            title:     this.tooltip,
            html:      true,
            container: document.body,
            trigger:   'manual'
        });
    }
}
