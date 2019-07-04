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


@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy
{
    @Input()
    public tooltip:string;

    private tooltipEl:Tooltip;
    private _placement:Placement;

    constructor(private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        this.tooltipEl = new Tooltip(this.elementRef.nativeElement, {
            placement: this._placement,
            title:     this.tooltip,
            html:      true,
            container: document.body,
            trigger:   'manual'
        });
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

    @Input()
    public set placement(placement:Placement)
    {
        if(placement !== null && placement !== undefined && placement.length !== 0)
        {
            this._placement = placement;
        }
        else
        {
            this._placement = 'top';
        }
    }
}
