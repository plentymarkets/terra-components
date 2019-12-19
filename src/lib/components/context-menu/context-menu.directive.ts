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

import tippy, { Placement } from 'tippy.js';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';
import { Router } from '@angular/router';
import {
    noop,
    Subscription
} from 'rxjs';
import { ContextMenuTrigger } from './context-menu-trigger';

@Directive({
    selector: '[tcContextMenu]'
})
export class ContextMenuDirective<D> implements OnDestroy, OnChanges
{
    /**
     * @description The context-menu content.
     */
    @Input()
    public tcContextMenu:TemplateRef<any>;

    /**
     * @description The method how to trigger the context-menu. Default `hover`.
     */
    @Input()
    public trigger:ContextMenuTrigger = ContextMenuTrigger.hover;

    /**
     * @description The placement. Default `bottom`.
     */
    @Input()
    public placement:string = TerraPlacementEnum.BOTTOM;

    /** @description The theme selector for css. Default `context-menu`*/
    @Input()
    public theme:string = 'context-menu';

    /** @description Function to be called when tooltip is shown. */
    @Input()
    public onShown:() => void = noop;

    /** @description Function to be called when tooltip is hidden. */
    @Input()
    public onHidden:() => void = noop;

    private contextMenuEl:any;
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

            this.initContextMenu(div);

            this.navigationSubscription = this.router.events.subscribe(() =>
            {
                this.contextMenuEl.hide(0);
            });
        }

        if(changes.hasOwnProperty('placement') && changes['placement'].currentValue)
        {
            if(this.contextMenuEl)
            {
                this.contextMenuEl.setProps({
                    placement: this.placement as Placement
                });
            }
        }
    }

    @HostListener('window:click', ['$event'])
    public onClick(event:MouseEvent):void
    {
        if(this.contextMenuEl && this.trigger === ContextMenuTrigger.rightClick)
        {
            event.stopPropagation();
            this.contextMenuEl.hide();
        }
    }

    @HostListener('contextmenu', ['$event'])
    public onContextMenu(event:MouseEvent):void
    {
        event.stopPropagation();
        event.preventDefault();

        if(event.currentTarget !== this.elementRef.nativeElement)
        {
            this.contextMenuEl.hide();
        }
        else
        {
            if(this.contextMenuEl && this.trigger === ContextMenuTrigger.rightClick)
            {
                this.contextMenuEl.show();
            }
        }
    }

    public ngOnDestroy():void
    {
        if(this.contextMenuEl)
        {
            this.contextMenuEl.destroy();
        }

        if(this.navigationSubscription)
        {
            this.navigationSubscription.unsubscribe();
        }
    }

    /**
     * initialize the tippy element
     * @param contextMenu
     */
    private initContextMenu(contextMenu:Element):void
    {
        if(!this.contextMenuEl)
        {
            let trigger:string;

            switch(this.trigger)
            {
                case ContextMenuTrigger.rightClick:
                    trigger = 'manual';
                    break;

                case ContextMenuTrigger.hover:
                default:
                    trigger = 'mouseenter focus';
            }

            this.contextMenuEl = tippy(this.elementRef.nativeElement, {
                content:     contextMenu,
                trigger:     trigger,
                interactive: true,
                hideOnClick: false,
                arrow:       false,
                appendTo:    document.body,
                placement:   this.placement as Placement,
                distance:    0,
                theme:       this.theme,
                duration:    [0,
                              0],
                flip:        false,
                onShown:     this.onShown,
                onHidden:    this.onHidden
            });
        }
        else
        {
            this.contextMenuEl.setContent(contextMenu);
        }
    }
}
