import {
    Directive,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import tippy, {
    Instance,
    Placement
} from 'tippy.js';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[tcTooltip]'
})
export class TooltipDirective implements OnDestroy, OnChanges
{
    /**
     * @description The tooltip text.
     */
    @Input()
    public tcTooltip:string | TemplateRef<unknown>;

    /**
     * @description Show the tooltip only when ellipsis is present. Default false.
     */
    @Input()
    public onlyEllipsisTooltip:boolean = false;

    private _isDisabled:boolean;
    private _tippyInstance:Instance;
    private _placement:string = TerraPlacementEnum.TOP;
    private navigationSubscription:Subscription;

    /**
     * Set the placement of the tooltip.
     * @param placement
     */
    @Input()
    public set placement(placement:string)
    {
        if(!placement)
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

        this._handleTooltipState();
    }

    constructor(private _elementRef:ElementRef,
                private _containerRef:ViewContainerRef,
                private _router:Router)
    {
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('isDisabled'))
        {
            this._handleTooltipState();
        }

        if(changes.hasOwnProperty('tcTooltip'))
        {
            if(changes['tcTooltip'].currentValue)
            {
                let tooltip:string | Element;
                let tooltipIsEmpty:boolean = true;

                // example found here: https://netbasal.com/create-advanced-components-in-angular-e0655df5dde6
                if(this.tcTooltip instanceof TemplateRef)
                {
                    const viewRef:EmbeddedViewRef<unknown> = this._containerRef.createEmbeddedView(this.tcTooltip, {});

                    let div:HTMLElement = document.createElement('div');

                    viewRef.rootNodes.forEach((node:HTMLElement) =>
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

                this._initTooltip(tooltip);

                this.navigationSubscription = this._router.events.subscribe(() =>
                {
                    this._tippyInstance.hide(0);
                });

                if(tooltipIsEmpty)
                {
                    this.isDisabled = true;
                }
            }
            else
            {
                this.isDisabled = true;
            }
        }

        if(changes.hasOwnProperty('placement'))
        {
            if(this._tippyInstance)
            {
                this._tippyInstance.setProps({
                    placement: this._placement as Placement
                });
            }
        }
    }

    @HostListener('mouseout', ['$event'])
    public onMouseOut(event:MouseEvent):void
    {
        event.stopPropagation();
        if(this._tippyInstance)
        {
            this._tippyInstance.hide(0);
        }
    }

    @HostListener('mouseover', ['$event'])
    public onMouseOver(event:MouseEvent):void
    {
        event.stopPropagation();
        if(this._tippyInstance)
        {
            if(this.onlyEllipsisTooltip)
            {
                this._checkIfEllipsis();
            }

            this._tippyInstance.show(0);
        }
    }

    public ngOnDestroy():void
    {
        if(this._tippyInstance)
        {
            this._tippyInstance.destroy();
        }

        if(this.navigationSubscription)
        {
            this.navigationSubscription.unsubscribe();
        }
    }

    private _handleTooltipState():void
    {
        if(this._tippyInstance)
        {
            if(this._isDisabled)
            {
                this._tippyInstance.disable();
            }
            else
            {
                this._tippyInstance.enable();
            }
        }
    }

    private _checkIfEllipsis():void
    {
        let curOverflow:string = this._elementRef.nativeElement.style.overflow;

        // 'hide' overflow to get correct scrollWidth
        if(!curOverflow || curOverflow === 'visible')
        {
            this._elementRef.nativeElement.style.overflow = 'hidden';
        }

        // check if is overflowing
        let isOverflowing:boolean = this._elementRef.nativeElement.clientWidth < this._elementRef.nativeElement.scrollWidth;

        // 'reset' overflow to initial state
        this._elementRef.nativeElement.style.overflow = curOverflow;

        this.isDisabled = !isOverflowing;
    }

    /**
     * initialize the tippy element
     * @param tooltip
     */
    private _initTooltip(tooltip:string | Element):void
    {
        if(!this._tippyInstance)
        {
            this._tippyInstance = tippy(this._elementRef.nativeElement as Element, {
                content:     tooltip,
                trigger:     'manual',
                arrow:       true,
                boundary:    'window',
                hideOnClick: false,
                placement:   this._placement as Placement
            });
        }
        else
        {
            this._tippyInstance.setContent(tooltip);
        }
    }
}
