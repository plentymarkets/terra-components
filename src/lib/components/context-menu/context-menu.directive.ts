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

import tippy from 'tippy.js';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[tcContextMenu]'
})
export class ContextMenuDirective implements OnDestroy, OnChanges
{
    /**
     * @description The tooltip text.
     */
    @Input()
    public tcContextMenu:TemplateRef<any>;

    private tooltipEl:any;
    private navigationSubscription:Subscription;

    constructor(private elementRef:ElementRef,
                private containerRef:ViewContainerRef,
                private router:Router)
    {
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('tcContextMenu') && changes['tcContextMenu'].currentValue)
        {
            const viewRef:EmbeddedViewRef<any> = this.containerRef.createEmbeddedView(this.tcContextMenu, {});

            let div:HTMLElement = document.createElement('div');

            viewRef.rootNodes.forEach((node:HTMLElement) =>
            {
                div.append(node);
            });

            this.initTooltip(div);

            this.navigationSubscription = this.router.events.subscribe(() =>
            {
                this.tooltipEl.hide(0);
            });
        }
    }

    // @HostListener('mouseout', ['$event'])
    // public onMouseOut(event:MouseEvent):void
    // {
    //     event.stopPropagation();
    //     // if(this.tooltipEl)
    //     // {
    //     //     this.tooltipEl.hide(0);
    //     // }
    // }

    // @HostListener('mouseover', ['$event'])
    // public onMouseOver(event:MouseEvent):void
    // {
    //     event.stopPropagation();
    //     if(this.tooltipEl)
    //     {
    //         this.tooltipEl.show(0);
    //     }
    // }

    public ngOnDestroy():void
    {
        if(this.tooltipEl)
        {
            this.tooltipEl.destroy();
        }

        if(this.navigationSubscription)
        {
            this.navigationSubscription.unsubscribe();
        }
    }

    /**
     * initialize the tippy element
     * @param tooltip
     */
    private initTooltip(tooltip:string | Element):void
    {
        if(!this.tooltipEl)
        {
            this.tooltipEl = tippy(this.elementRef.nativeElement, {
                content:     tooltip,
                interactive: true,
                arrow:       false,
                boundary:    'window',
                placement:   TerraPlacementEnum.BOTTOM,
                distance:    0,
                theme:       'context-menu'
            });
        }
        else
        {
            this.tooltipEl.setContent(tooltip);
        }
    }
}
