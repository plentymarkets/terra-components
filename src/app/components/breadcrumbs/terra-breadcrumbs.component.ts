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
    constructor(protected breadcrumbsService:TerraBreadcrumbsService, private activatedRoute:ActivatedRoute, private router:Router)
    {
        console.log(this.getCompletePathByRoute(this.activatedRoute.snapshot.routeConfig, this.router.config, ''));
        this.breadcrumbsService.initialPath =
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

    protected removeBreadcrumb(child:TerraBreadcrumb):void
    {

    }

    protected updateBreadcrumb(child:TerraBreadcrumb):void
    {
        this.breadcrumbsService.updateBreadcrumb(child);
    }
}
