import {
    ComponentRef,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
    ViewRef
} from '@angular/core';

import tippy, { Placement } from 'tippy.js';
import { isNullOrUndefined } from 'util';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';

export class ContentRef
{
    constructor(public nodes:Array<any>, public viewRef?:ViewRef, public componentRef?:ComponentRef<any>)
    {
    }
}

@Directive({
    selector: '[tcTooltip]'
})
export class TooltipDirective implements OnDestroy, OnChanges
{
    /**
     * @description The tooltip text.
     */
    @Input()
    public tcTooltip:string | TemplateRef<any>;

    /**
     * @description Show the tooltip only when ellipsis is present. Default false.
     */
    @Input()
    public onlyEllipsisTooltip:boolean = false;

    private _isDisabled:boolean;
    private tooltipEl:any;
    private _placement:string;

    /**
     * @deprecated since v4. The placement is calculated automatically now.
     * @param placement
     */
    @Input()
    public set placement(placement:string)
    {
        console.warn('`placement` is deprecated since v4. The placement is calculated automatically now.');

        if(isNullOrUndefined(placement))
        {
            placement = TerraPlacementEnum.TOP;
        }

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

    constructor(private elementRef:ElementRef, private containerRef:ViewContainerRef)
    {
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('isDisabled'))
        {
            this.handleTooltipState();
        }

        if(changes.hasOwnProperty('tcTooltip'))
        {
            if(!isNullOrUndefined(changes['tcTooltip'].currentValue))
            {
                let tooltip:string | Element;
                let tooltipIsEmpty:boolean = true;

                // example found here: https://netbasal.com/create-advanced-components-in-angular-e0655df5dde6
                if(this.tcTooltip instanceof TemplateRef)
                {
                    let content:ContentRef = this.getContentRef();

                    let div:HTMLElement = document.createElement('div');

                    content.nodes.forEach((node:HTMLElement) =>
                    {
                        div.append(node);
                    });

                    tooltip = div;

                    tooltipIsEmpty = div.innerHTML.length === 0;
                }
                else if(typeof this.tcTooltip === 'string')
                {
                    tooltip = this.tcTooltip;

                    tooltipIsEmpty = tooltip.length === 0;
                }

                if(isNullOrUndefined(this.tooltipEl))
                {
                    if(isNullOrUndefined(this._placement))
                    {
                        this._placement = TerraPlacementEnum.TOP;
                    }

                    this.tooltipEl = tippy(this.elementRef.nativeElement, {
                        content:   tooltip,
                        trigger:   'manual',
                        arrow:     true,
                        boundary:  'window',
                        placement: this._placement as Placement
                    });

                    if(tooltipIsEmpty)
                    {
                        this.isDisabled = true;
                    }
                }
                else
                {
                    this.tooltipEl.setContent(tooltip);
                }
            }
            else
            {
                this.isDisabled = true;
            }
        }

        if(changes.hasOwnProperty('placement'))
        {
            if(!isNullOrUndefined(this.tooltipEl))
            {
                this.tooltipEl.set({
                    placement: this._placement as Placement
                });
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

    private getContentRef():ContentRef
    {
        if(!this.tcTooltip)
        {
            return new ContentRef([]);
        }
        else if(this.tcTooltip instanceof TemplateRef)
        {
            const viewRef:EmbeddedViewRef<any> = this.containerRef.createEmbeddedView(this.tcTooltip, {});

            return new ContentRef(viewRef.rootNodes, viewRef);
        }
    }
}
