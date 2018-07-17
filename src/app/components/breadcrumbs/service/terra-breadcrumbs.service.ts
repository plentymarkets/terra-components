import { Injectable } from '@angular/core';
import { TerraBreadcrumb } from '../terra-breadcrumb';
import {
    NavigationEnd,
    Route,
    Router,
    RouterEvent,
    Routes
} from '@angular/router';
import {
    isNull,
    isNullOrUndefined
} from 'util';
import { StringHelper } from '../../../helpers/string.helper';
import { TranslationService } from 'angular-l10n';
import { TerraBreadcrumbContainer } from '../terra-breadcrumb-container';

@Injectable()
export class TerraBreadcrumbsService
{
    public breadcrumbs:Array<TerraBreadcrumb> = [];
    public breadcrumbContainer:Array<TerraBreadcrumbContainer> = [];

    private _initialPath:string;
    private initialRoute:Route;

    constructor(private router:Router,
                private translation:TranslationService)
    {
        this.router.events.filter((event:RouterEvent) =>
        {
            return event instanceof NavigationEnd // navigation is done
                   && !isNullOrUndefined(this._initialPath) // initialPath is set
                   && event.urlAfterRedirects.startsWith('/' + this._initialPath); // url starts with the initial path
        }).subscribe((event:NavigationEnd) =>
        {
            if(!isNullOrUndefined(this.initialRoute.children))
            {
                let shortUrl:string = event.urlAfterRedirects.replace('/' + this._initialPath + '/', '');
                let route:Route = this.findRouteByFlatPath(shortUrl, this.initialRoute.children);

                this.emit(route, event.urlAfterRedirects);
            }
        });
    }

    public set initialPath(value:string)
    {
        this._initialPath = value;
        this.initialRoute = this.getRouteForUrlParts(this._initialPath.split('/'), this.router.config);
    }

    private emit(route:Route, url:string):void
    {
        let label:string = this.translation.translate(route.data.label);

        let idList:Array<number> = route.data['idList'];

        if(!isNullOrUndefined(idList) && !isNullOrUndefined(idList[idList.length - 1]))
        {
            label = label + ' ' + idList[idList.length - 1];
        }

        let foundBreadcrumbContainer:TerraBreadcrumbContainer =
            this.breadcrumbContainer.find((bcc:TerraBreadcrumbContainer) =>
            {
                return bcc.parameterisedRoute === route.path;
            });

        if(isNullOrUndefined(foundBreadcrumbContainer))
        {
            let newContainer:TerraBreadcrumbContainer = new TerraBreadcrumbContainer(route.path);
            this.breadcrumbContainer.push(newContainer);

            let breadcrumb:TerraBreadcrumb = new TerraBreadcrumb(label, route.path, url, idList[0]);

            newContainer.breadcrumbList.push(breadcrumb);

            newContainer.currentSelectedBreadcrumb = breadcrumb;
        }
        else
        {
            let foundBreadcrumb:TerraBreadcrumb = foundBreadcrumbContainer.breadcrumbList.find((bc:TerraBreadcrumb) =>
            {
                return bc.routerLink === url;
            });

            if(isNullOrUndefined(foundBreadcrumb))
            {
                let breadcrumb:TerraBreadcrumb = new TerraBreadcrumb(label, route.path, url, idList[0]);

                foundBreadcrumbContainer.breadcrumbList.push(breadcrumb);

                foundBreadcrumbContainer.currentSelectedBreadcrumb = breadcrumb;

                this.handleVisibleBreadcrumbContainer(breadcrumb, foundBreadcrumbContainer);
            }
            else
            {
                foundBreadcrumbContainer.currentSelectedBreadcrumb = foundBreadcrumb;

                this.handleVisibleBreadcrumbContainer(foundBreadcrumb, foundBreadcrumbContainer);
            }
        }

        this.selectedBreadcrumbForAllContainer(idList[0]);
    }

    private handleVisibleBreadcrumbContainer(breadcrumb:TerraBreadcrumb, breadcrumbContainer:TerraBreadcrumbContainer):void
    {
        let index:number = this.breadcrumbContainer.indexOf(breadcrumbContainer);

        if(index > -1)
        {
            for(let i:number = index; i < this.breadcrumbContainer.length; i++)
            {
                let container:TerraBreadcrumbContainer = this.breadcrumbContainer[i];

                container.isHidden = container.parameterisedRoute !== breadcrumb.parameterisedRoute &&
                                     !isNullOrUndefined(container.currentSelectedBreadcrumb.id) &&
                                     !isNullOrUndefined(breadcrumb.id) &&
                                     container.currentSelectedBreadcrumb.id !== breadcrumb.id;
            }
        }
    }

    private selectedBreadcrumbForAllContainer(id:number):void
    {
        this.breadcrumbContainer.forEach((bcc:TerraBreadcrumbContainer) =>
        {
            bcc.breadcrumbList.forEach((bc:TerraBreadcrumb) =>
            {
                if(bc.id === id)
                {
                    bcc.currentSelectedBreadcrumb = bc;
                    bcc.isHidden = false;
                }
            });
        });
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

            let idList:Array<number> = [];

            if(splittedFlatPath.length === splittedRoutePath.length)
            {
                for(let path of splittedRoutePath)
                {
                    if(path.startsWith(':'))
                    {
                        // could be overwritten to get the last id of parameterised route
                        let index:number = splittedRoutePath.indexOf(path);

                        idList.push(+splittedFlatPath[index]);

                        parameterisedRoutes[path] = index;
                    }
                }
            }

            route.data['idList'] = idList;

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

    public checkActiveRoute(breadcrumb:TerraBreadcrumb):boolean
    {
        return this.router.isActive(breadcrumb.routerLink, true);
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
    }
}
