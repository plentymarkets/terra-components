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
export class ContextMenuDirective implements OnDestroy, OnChanges
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

    /** @description The theme selector for css. Default `terra-context-menu`*/
    @Input()
    public theme:string = 'terra-context-menu';

    /** @description Function to be called when tooltip is shown. */
    @Input()
    public onShown:() => void = noop;

    /** @description Function to be called when tooltip is hidden. */
    @Input()
    public onHidden:() => void = noop;

    private _contextMenuEl:any;
    private _navigationSubscription:Subscription;

    constructor(private _elementRef:ElementRef,
                private _containerRef:ViewContainerRef,
                private _router:Router)
    {
        this._navigationSubscription = this._router.events.subscribe(() =>
        {
            if(this._contextMenuEl)
            {
                this._contextMenuEl.hide(0);
            }
        });
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('tcContextMenu') && changes['tcContextMenu'].currentValue)
        {
            const viewRef:EmbeddedViewRef<any> = this._containerRef.createEmbeddedView(this.tcContextMenu, {});

            let div:HTMLElement = document.createElement('div');

            viewRef.rootNodes.forEach((node:HTMLElement) =>
            {
                div.append(node);
            });

            this._initContextMenu(div);
        }

        if(changes.hasOwnProperty('placement') && changes['placement'].currentValue)
        {
            if(this._contextMenuEl)
            {
                this._contextMenuEl.setProps({
                    placement: this.placement as Placement
                });
            }
        }
    }

    @HostListener('window:click', ['$event'])
    public _onClick(event:MouseEvent):void
    {
        if(this._contextMenuEl && this.trigger === ContextMenuTrigger.rightClick)
        {
            event.stopPropagation();
            this._contextMenuEl.hide();
        }
    }

    @HostListener('contextmenu', ['$event'])
    public _onContextMenu(event:MouseEvent):void
    {
        event.stopPropagation();
        event.preventDefault();

        if(event.currentTarget !== this._elementRef.nativeElement)
        {
            this._contextMenuEl.hide();
        }
        else
        {
            if(this._contextMenuEl && this.trigger === ContextMenuTrigger.rightClick)
            {
                this._contextMenuEl.show();
            }
        }
    }

    public ngOnDestroy():void
    {
        if(this._contextMenuEl)
        {
            this._contextMenuEl.destroy();
        }

        if(this._navigationSubscription)
        {
            this._navigationSubscription.unsubscribe();
        }
    }

    /**
     * initialize the tippy element
     * @param contextMenu
     */
    private _initContextMenu(contextMenu:Element):void
    {
        if(!this._contextMenuEl)
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

            this._contextMenuEl = tippy(this._elementRef.nativeElement, {
                content:       contextMenu,
                trigger:       trigger,
                interactive:   true,
                arrow:         false,
                appendTo:      document.body,
                placement:     this.placement as Placement,
                distance:      0,
                theme:         this.theme,
                duration:      [0,
                                0],
                flip:          false,
                onShown:       this.onShown,
                onHidden:      this.onHidden,
                popperOptions: {
                    modifiers: {
                        preventOverflow: {
                            padding: 0
                        }
                    }
                }
            });
        }
        else
        {
            this._contextMenuEl.setContent(contextMenu);
        }
    }
}
