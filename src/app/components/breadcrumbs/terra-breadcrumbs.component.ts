import { Component } from '@angular/core';
import { TerraBreadcrumbsService } from './service/terra-breadcrumbs.service';
import {
    ActivatedRoute,
    Route,
    Router,
    Routes
} from '@angular/router';
import { isNullOrUndefined } from 'util';
import { TerraBreadcrumb } from './terra-breadcrumb';
import { TerraBreadcrumbContainer } from './terra-breadcrumb-container';

@Component(
    {
        selector:  'terra-breadcrumbs',
        styles:    [require('./terra-breadcrumbs.component.scss')],
        template:  require('./terra-breadcrumbs.component.html'),
        providers: [TerraBreadcrumbsService]
    }
)
export class TerraBreadcrumbsComponent
{
    protected mouseLeft:string = '0px';
    protected isTooltipDisabled:boolean = false;

    constructor(private _breadcrumbsService:TerraBreadcrumbsService,
                private activatedRoute:ActivatedRoute,
                private router:Router)
    {
        this._breadcrumbsService.initialPath =
            this.getCompletePathByRoute(this.activatedRoute.snapshot.routeConfig, this.router.config, '');
    }

    // identical code exists in TerraRouterHelper in terra
    private getCompletePathByRoute(routeToFind:Route, routeConfig:Routes, parentPath:string):string
    {
        let path:string = null;

        if(!isNullOrUndefined(routeConfig))
        {
            for(let route of routeConfig)
            {
                if(!isNullOrUndefined(route.data) && !isNullOrUndefined(route.data.permissions) && route === routeToFind)
                {
                    path = parentPath + '/' + route.path;

                    if(parentPath.length === 0)
                    {
                        path = route.path;
                    }

                    return path;
                }
                else if(route.children)
                {
                    path = this.getCompletePathByRoute(routeToFind, route.children, parentPath);

                    if(!isNullOrUndefined(path))
                    {
                        path = route.path + '/' + path;
                        break;
                    }
                }
            }
        }

        return path;
    }

    protected get breadcrumbContainers():Array<TerraBreadcrumbContainer>
    {
        return this._breadcrumbsService.containers;
    }

    protected closeBreadcrumb(container:TerraBreadcrumbContainer, breadcrumb:TerraBreadcrumb, event:Event):void
    {
        event.stopPropagation();

        this._breadcrumbsService.closeBreadcrumb(container, breadcrumb);
    }

    protected checkActiveRoute(bcc:TerraBreadcrumb):boolean
    {
        return this._breadcrumbsService.checkActiveRoute(bcc);
    }

    public get breadcrumbsService():TerraBreadcrumbsService
    {
        return this._breadcrumbsService;
    }

    protected calculatePosition(container:HTMLLIElement, contextMenu:HTMLUListElement):void
    {
        let containerClientRect:ClientRect = container.getBoundingClientRect();
        let contextMenuClientRect:ClientRect = contextMenu.getBoundingClientRect();

        let isOutsideRight:boolean = (contextMenuClientRect.width + containerClientRect.left) > screen.width;

        let left:number = 0;

        if(isOutsideRight)
        {
            left = screen.width - contextMenuClientRect.width;
        }
        else
        {
            left = containerClientRect.left;
        }

        this.mouseLeft = left + 'px';
    }

    protected checkLastBreadcrumbContainer(index:number):boolean
    {
        let nextContainer:TerraBreadcrumbContainer = this.breadcrumbContainers[index + 1];

        return !isNullOrUndefined(nextContainer) &&
               !isNullOrUndefined(nextContainer.currentSelectedBreadcrumb) &&
               !nextContainer.currentSelectedBreadcrumb.isHidden;
    }

    protected checkTooltip(el:HTMLElement):void
    {
        let curOverflow:string = el.style.overflow;

        // 'hide' overflow to get correct scrollWidth
        if(!curOverflow || curOverflow === 'visible')
        {
            el.style.overflow = 'hidden';
        }

        // check if is overflowing
        let isOverflowing:boolean = el.clientWidth < el.scrollWidth;

        // 'reset' overflow to initial state
        el.style.overflow = curOverflow;

        this.isTooltipDisabled = !isOverflowing;
    }
}
