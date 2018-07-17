import { Injectable } from '@angular/core';
import { TerraBreadcrumb } from '../terra-breadcrumb';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    NavigationEnd,
    Route,
    Router,
    RouterEvent,
    Routes
} from '@angular/router';
import { isNullOrUndefined } from 'util';
import { StringHelper } from '../../../helpers/string.helper';
import { TranslationService } from 'angular-l10n';
import { TerraBreadcrumbContainer } from '../terra-breadcrumb-container';

@Injectable()
export class TerraBreadcrumbsService
{
    public breadcrumbs:Array<TerraBreadcrumb> = [];
    public breadcrumbContainerList:Array<TerraBreadcrumbContainer> = [];

    private _initialPath:string;
    private initialRoute:Route;

    constructor(private router:Router,
                private translation:TranslationService,
                private activatedRoute:ActivatedRoute)
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
        let label:string;

        if(typeof route.data.label === 'function')
        {
            let activatedSnapshot:ActivatedRouteSnapshot = this.findActivatedRouteSnapshot(this.router.routerState.snapshot.root);

            label = this.translation.translate(route.data.label(activatedSnapshot.data));
        }
        else
        {
            label = this.translation.translate(route.data.label);
        }

        let idList:Array<number> = route.data['idList'];

        if(!isNullOrUndefined(idList) && !isNullOrUndefined(idList[idList.length - 1]))
        {
            label = label + ' ' + idList[idList.length - 1];
        }

        // search for existing container
        let foundBreadcrumbContainer:TerraBreadcrumbContainer =
            this.breadcrumbContainerList.find((bcc:TerraBreadcrumbContainer) =>
            {
                return bcc.parameterisedRoute === route.path;
            });

        // if not found  create new container with new breadcrumb
        if(isNullOrUndefined(foundBreadcrumbContainer))
        {
            let newContainer:TerraBreadcrumbContainer = new TerraBreadcrumbContainer(route.path);
            this.breadcrumbContainerList.push(newContainer);

            let breadcrumb:TerraBreadcrumb = new TerraBreadcrumb(label, route.path, url, idList[0]);

            newContainer.breadcrumbList.push(breadcrumb);

            newContainer.currentSelectedBreadcrumb = breadcrumb;
        }
        else
        {
            // search for existing breadcrumb
            let foundBreadcrumb:TerraBreadcrumb = foundBreadcrumbContainer.breadcrumbList.find((bc:TerraBreadcrumb) =>
            {
                return bc.routerLink === url;
            });

            // breadcrumb not found
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
        let index:number = this.breadcrumbContainerList.indexOf(breadcrumbContainer);

        if(index > -1)
        {
            for(let i:number = index; i < this.breadcrumbContainerList.length; i++)
            {
                let container:TerraBreadcrumbContainer = this.breadcrumbContainerList[i];

                container.isHidden = container.parameterisedRoute !== breadcrumb.parameterisedRoute &&
                                     !isNullOrUndefined(container.currentSelectedBreadcrumb.id) &&
                                     !isNullOrUndefined(breadcrumb.id) &&
                                     container.currentSelectedBreadcrumb.id !== breadcrumb.id;
            }
        }
    }

    // same exists in TerraRouterHelper
    public findActivatedRouteSnapshot(activatedRouteSnapshot:ActivatedRouteSnapshot):ActivatedRouteSnapshot
    {
        if(!isNullOrUndefined(activatedRouteSnapshot.firstChild))
        {
            return this.findActivatedRouteSnapshot(activatedRouteSnapshot.firstChild);
        }

        return activatedRouteSnapshot;
    }

    private selectedBreadcrumbForAllContainer(id:number):void
    {
        this.breadcrumbContainerList.forEach((bcc:TerraBreadcrumbContainer) =>
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
                        let index:number = splittedRoutePath.indexOf(path);

                        idList.push(+splittedFlatPath[index]);

                        parameterisedRoutes[path] = index;
                    }
                }
            }

            // save all ID's from current route into array
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

    public closeBreadcrumb(breadcrumbContainer:TerraBreadcrumbContainer, breadcrumb:TerraBreadcrumb):void
    {
        let breadcrumbList:Array<TerraBreadcrumb> = breadcrumbContainer.breadcrumbList;

        // search breadcrumb
        let index:number = breadcrumbList.indexOf(breadcrumb);

        breadcrumbList.splice(index, 1);

        // search for previous breadcrumb
        let previousBreadcrumb:TerraBreadcrumb = breadcrumbList[breadcrumbList.length - 1];

        if(isNullOrUndefined(previousBreadcrumb))
        {
            let bccIndex:number = this.breadcrumbContainerList.indexOf(breadcrumbContainer);

            let previousBreadcrumbContainer:TerraBreadcrumbContainer = this.breadcrumbContainerList[bccIndex - 1];

            if(!isNullOrUndefined(previousBreadcrumbContainer))
            {
                this.router.navigateByUrl(previousBreadcrumbContainer.currentSelectedBreadcrumb.routerLink);
            }

            this.breadcrumbContainerList.splice(bccIndex, 1);
        }
        else if(previousBreadcrumb !== breadcrumb)
        {
            this.router.navigateByUrl(previousBreadcrumb.routerLink);
        }
    }
}
