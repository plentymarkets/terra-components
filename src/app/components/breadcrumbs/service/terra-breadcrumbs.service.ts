import { Injectable } from '@angular/core';
import { TerraBreadcrumb } from '../terra-breadcrumb';
import {
    NavigationEnd,
    Route,
    Router,
    RouterEvent,
    Routes
} from '@angular/router';
import { isNullOrUndefined } from 'util';
import { StringHelper } from '../../../helpers/string.helper';
import { TranslationService } from 'angular-l10n';
import { distinctUntilChanged } from 'rxjs/operators';
import { TerraBreadcrumbContainer } from '../terra-breadcrumb-container';

@Injectable()
export class TerraBreadcrumbsService
{
    public initialPath:string;

    public breadcrumbs:Array<TerraBreadcrumb> = [];
    public breadcrumbContainer:Array<TerraBreadcrumbContainer> = [];

    private breadcrumbsObj:{ [key:string]:TerraBreadcrumb } = {};

    constructor(private router:Router,
                private translation:TranslationService)
    {
        this.router.events.filter((event:RouterEvent) =>
        {
            return event instanceof NavigationEnd;
        }).subscribe((event:NavigationEnd) =>
        {
            if(!isNullOrUndefined(this.initialPath) && event.urlAfterRedirects.startsWith('/' + this.initialPath))
            {
                let initialRoute:Route = this.getRouteForUrlParts(this.initialPath.split('/'), this.router.config);

                if(!isNullOrUndefined(initialRoute.children))
                {
                    let shortUrl:string = event.urlAfterRedirects.replace('/' + this.initialPath + '/', '');
                    let route:Route = this.findRouteByFlatPath(shortUrl, initialRoute.children);

                    let label:string = this.translation.translate(route.data.label);

                    // TODO maybe save all id's for breadcrumb handling
                    let id:number = route.data['idForBreadcrumb'];

                    if(!isNullOrUndefined(id))
                    {
                        label = label + ' ' + id;
                    }

                    this.emit(new TerraBreadcrumb(label, route.path, event.urlAfterRedirects, id));
                }
            }
        });
    }

    public emit(breadcrumb:TerraBreadcrumb):void
    {
        let foundBreadcrumbContainer:TerraBreadcrumbContainer =
            this.breadcrumbContainer.find((bcc:TerraBreadcrumbContainer) =>
            {
                return bcc.parameterisedRoute === breadcrumb.parameterisedRoute;
            });

        if(isNullOrUndefined(foundBreadcrumbContainer))
        {
            let newContainer:TerraBreadcrumbContainer = new TerraBreadcrumbContainer(breadcrumb.parameterisedRoute);

            newContainer.currentSelectedBreadcrumb = breadcrumb;
            newContainer.breadcrumbList.push(breadcrumb);

            this.breadcrumbContainer.push(newContainer);
        }
        else
        {
            let foundBreadcrumb:TerraBreadcrumb = foundBreadcrumbContainer.breadcrumbList.find((bc:TerraBreadcrumb) =>
            {
                return bc.routerLink === breadcrumb.routerLink;
            });

            if(isNullOrUndefined(foundBreadcrumb))
            {
                foundBreadcrumbContainer.breadcrumbList.push(breadcrumb);
            }

            let index:number = this.breadcrumbContainer.indexOf(foundBreadcrumbContainer);

            if(index > -1)
            {
                for(let i:number = index; i < this.breadcrumbContainer.length; i++)
                {
                    let container:TerraBreadcrumbContainer = this.breadcrumbContainer[i];

                    //TODO not working properly
                    container.isHidden = container.parameterisedRoute !== breadcrumb.parameterisedRoute &&
                                         !isNullOrUndefined(container.currentSelectedBreadcrumb.id) &&
                                         !isNullOrUndefined(breadcrumb.id) &&
                                         container.currentSelectedBreadcrumb.id !== breadcrumb.id;
                }
            }

            foundBreadcrumbContainer.currentSelectedBreadcrumb = breadcrumb;
        }

        //this.breadcrumbContainer.forEach((container:TerraBreadcrumbContainer) =>
        //{
        //    container.isHidden =
        //        container !== foundBreadcrumbContainer &&
        //        container.parameterisedRoute === breadcrumb.parameterisedRoute &&
        //        container.currentSelectedBreadcrumb.id === breadcrumb.id;
        //});
    }

    public findRouteByFlatPath(flatPath:string, routeConfig:Routes):Route
    {
        if(isNullOrUndefined(routeConfig))
        {
            return undefined;
        }
        return routeConfig.find((route:Route) =>
        {
            let splittedRoutePath:Array<string> = route.path.split('/');

            let parameterisedRoutes:{ [key:string]:number } = {};

            let splittedFlatPath:Array<string> = flatPath.split('/');

            let indexForId:number;

            if(splittedFlatPath.length === splittedRoutePath.length)
            {
                for(let path of splittedRoutePath)
                {
                    if(path.startsWith(':'))
                    {
                        // could be overwritten to get the last id of parameterised route
                        indexForId = splittedRoutePath.indexOf(path);

                        parameterisedRoutes[path] = indexForId;
                    }
                }
            }

            // TODO maybe save all id's for breadcrumb handling
            if(!isNullOrUndefined(indexForId) && route.data['idForBreadcrumb'] !== splittedFlatPath[indexForId])
            {
                route.data['idForBreadcrumb'] = splittedFlatPath[indexForId];
            }

            Object.keys(parameterisedRoutes).forEach((key:string) =>
            {
                let index:number = parameterisedRoutes[key];

                splittedRoutePath[index] = splittedFlatPath[index];
            });

            let gluedRoutePath:string = splittedRoutePath.join('/');

            return !StringHelper.isNullUndefinedOrEmpty(route.path) &&
                   flatPath === gluedRoutePath;
        });
    }

    private getRouteForUrlParts(urlParts:Array<string>, routeConfig:Routes):Route
    {
        if(isNullOrUndefined(urlParts) || isNullOrUndefined(routeConfig))
        {
            return undefined;
        }

        let firstUrlPart:string = urlParts.shift();

        let foundRoute:Route = this.findRouteByPath(firstUrlPart, routeConfig);

        if(!isNullOrUndefined(foundRoute) && urlParts.length === 0)
        {
            return foundRoute;
        }
        else if(!isNullOrUndefined(foundRoute) && urlParts.length > 0)
        {
            return this.getRouteForUrlParts(urlParts, foundRoute.children);
        }
        else
        {
            return undefined;
        }
    }

    public findRouteByPath(routePath:string, routeConfig:Routes):Route
    {
        if(isNullOrUndefined(routeConfig))
        {
            return undefined;
        }
        return routeConfig.find((route:Route) =>
        {
            return route.path === routePath;
        });
    }

    public updateBreadcrumb(breadcrumb:TerraBreadcrumb):void
    {
        //this.breadcrumbsObj[breadcrumb.parameterisedRouterLink] = breadcrumb;

        //let container:TerraBreadcrumbContainer =
        //    this.breadcrumbContainer.find((bcc:TerraBreadcrumbContainer) =>
        //    {
        //        return bcc.parameterisedRoute === breadcrumb.parameterisedRoute;
        //    });
        //
        //if(!isNullOrUndefined(container))
        //{
        //    container.currentSelectedBreadcrumb = breadcrumb;
        //}
    }
}
