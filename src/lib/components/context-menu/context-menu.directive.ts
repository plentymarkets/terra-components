import {
    Directive,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import tippy from 'tippy.js';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextMenuTrigger } from './context-menu-trigger';
import { ContextMenuService } from './context-menu.service';

@Directive({
    selector: '[tcContextMenu]'
})
export class ContextMenuDirective<D> implements OnDestroy, OnChanges, OnInit
{
    /**
     * @description The context-menu content.
     */
    @Input()
    public tcContextMenu:TemplateRef<any>;

    /**
     * @description The method how to trigger the context-menu.
     */
    @Input()
    public trigger:ContextMenuTrigger = ContextMenuTrigger.hover;

    private contextMenuEl:any;
    private navigationSubscription:Subscription;

    constructor(private elementRef:ElementRef,
                private containerRef:ViewContainerRef,
                private router:Router,
                private contextMenuService:ContextMenuService<D>)
    {
    }

    public ngOnInit():void
    {
        this.contextMenuService.show.subscribe((event:MouseEvent):void =>
        {
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
        });
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

        this.contextMenuService.show.next(event);
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
                case ContextMenuTrigger.leftClick:
                    trigger = 'click';
                    break;

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
                boundary:    'window',
                appendTo:    document.body,
                placement:   TerraPlacementEnum.BOTTOM,
                distance:    0,
                theme:       'context-menu'
            });
        }
        else
        {
            this.contextMenuEl.setContent(contextMenu);
        }
    }
}
