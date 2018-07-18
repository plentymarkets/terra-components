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
    constructor(private breadcrumbsService:TerraBreadcrumbsService, private activatedRoute:ActivatedRoute, private router:Router)
    {
        let completePath:string = this.getCompletePathByRoute(this.activatedRoute.snapshot.routeConfig, this.router.config, '');
        console.log(completePath);
        this.breadcrumbsService.initialPath = completePath;
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

    protected get breadcrumbContainer():Array<TerraBreadcrumbContainer>
    {
        return this.breadcrumbsService.breadcrumbContainer;
    }

    protected closeBreadcrumb(container:TerraBreadcrumbContainer, child:TerraBreadcrumb, event:Event):void
    {
        event.stopPropagation();

        this.breadcrumbsService.closeBreadcrumb(container, child);
    }

    protected checkActiveRoute(bcc:TerraBreadcrumb):boolean
    {
        return this.breadcrumbsService.checkActiveRoute(bcc);
    }

    protected getAmountOfVisibleBreadcrumbsForContainer(container:TerraBreadcrumbContainer):number
    {
        return container.breadcrumbList.filter(bc => !bc.isHidden).length;
    }


}
