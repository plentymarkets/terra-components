import { Component } from '@angular/core';
import { TerraBreadcrumbsService } from './service/terra-breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { TerraBreadcrumb } from './terra-breadcrumb';
import { TerraBreadcrumbContainer } from './terra-breadcrumb-container';
import { isNullOrUndefined } from '../../public-api';

@Component({
    selector:  'terra-breadcrumbs',
    styles:    [require('./terra-breadcrumbs.component.scss')],
    template:  require('./terra-breadcrumbs.component.html'),
    providers: [TerraBreadcrumbsService]
})
export class TerraBreadcrumbsComponent
{
    protected mouseLeft:string = '0px';

    protected helperTooltip:string;
    protected isHelperTooltipDisabled:boolean;

    constructor(public readonly breadcrumbsService:TerraBreadcrumbsService,
                private activatedRoute:ActivatedRoute)
    {
        this.breadcrumbsService.activatedRoute = this.activatedRoute.snapshot;
    }

    protected get breadcrumbContainers():Array<TerraBreadcrumbContainer>
    {
        return this.breadcrumbsService.containers;
    }

    protected closeBreadcrumb(container:TerraBreadcrumbContainer, breadcrumb:TerraBreadcrumb, event:Event):void
    {
        event.stopPropagation();

        this.breadcrumbsService.closeBreadcrumb(container, breadcrumb);
    }

    protected checkActiveRoute(bcc:TerraBreadcrumb, container:HTMLLIElement):boolean
    {
        let isRouteActive:boolean = this.breadcrumbsService.checkActiveRoute(bcc);

        if(!isNullOrUndefined(container) && isRouteActive)
        {
            container.scrollIntoView();
        }

        return isRouteActive;
    }

    protected calculatePosition(container:HTMLLIElement, contextMenu:HTMLUListElement):void
    {
        let containerClientRect:ClientRect = container.getBoundingClientRect();
        let contextMenuClientRect:ClientRect = contextMenu.getBoundingClientRect();

        let isOutsideRight:boolean = (contextMenuClientRect.width + containerClientRect.left) > window.innerWidth;

        let left:number = 0;

        if(isOutsideRight)
        {
            left = window.innerWidth - contextMenuClientRect.width;
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
}
