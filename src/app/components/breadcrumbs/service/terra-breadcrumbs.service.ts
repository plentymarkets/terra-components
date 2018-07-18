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
import { UrlHelper } from '../../../helpers/url.helper';

@Injectable()
export class TerraBreadcrumbsService
{
    private _breadcrumbContainer:Array<TerraBreadcrumbContainer> = [];

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
                let shortUrl:string = event.urlAfterRedirects.replace('/' + this._initialPath, '');

                let urlParts:Array<string> = shortUrl.split('/');
                let urls:Array<string> = urlParts.map((urlPart:string, index:number) => urlParts.slice(0, index + 1).join('/'));
                urls.forEach((url:string) =>
                {
                    this.handleBreadcrumbForUrl(url, '/' + this._initialPath + url);
                });

                // update breadcrumb visibility for containers that have not been checked since the url is to short
                if(urlParts.length < this._breadcrumbContainer.length)
                {
                    for(let j:number = urlParts.length; j < this._breadcrumbContainer.length; j++)
                    {
                        this.updateBreadcrumbVisibilities(this._breadcrumbContainer[j], this._breadcrumbContainer[j - 1].currentSelectedBreadcrumb);
                    }
                }
            }
        });
    }

    public set initialPath(value:string)
    {
        this._breadcrumbContainer = [];
        this._initialPath = value;
        this.initialRoute = this.getRouteForUrlParts(this._initialPath.split('/'), this.router.config);
    }

    public get breadcrumbContainer():Array<TerraBreadcrumbContainer>
    {
        return this._breadcrumbContainer;
    }

    private handleBreadcrumbForUrl(shortUrl:string, fullUrl:string):void
    {
        let shortUrlWithoutLeadingSlash:string = UrlHelper.removeLeadingSlash(shortUrl);
        let route:Route = this.findRouteByFlatPath(shortUrlWithoutLeadingSlash, this.initialRoute.children);
        this.emit(route, fullUrl, shortUrl.split('/').length - 1);
    }

    private emit(route:Route, url:string, urlPartsCount:number):void
    {
        if(isNullOrUndefined(route))
        {
            return;
        }

        let label:string = '';

        if(route.data)
        {

            if(typeof route.data.label === 'function')
            {
                let activatedSnapshot:ActivatedRouteSnapshot = this.findActivatedRouteSnapshot(this.router.routerState.snapshot.root);

                label = this.translation.translate(route.data.label(activatedSnapshot.data));
            }
            else
            {
                label = this.translation.translate(route.data.label);
            }
        }

        // search for existing container
        let container:TerraBreadcrumbContainer = this._breadcrumbContainer[urlPartsCount];
        let previousContainer:TerraBreadcrumbContainer = this._breadcrumbContainer[urlPartsCount - 1];

        // if not found create new container with new breadcrumb
        if(isNullOrUndefined(container))
        {
            let newContainer:TerraBreadcrumbContainer = new TerraBreadcrumbContainer();
            this._breadcrumbContainer.push(newContainer);

            let parentBreadcrumb:TerraBreadcrumb = isNullOrUndefined(previousContainer) ? undefined : previousContainer.currentSelectedBreadcrumb;
            let breadcrumb:TerraBreadcrumb = new TerraBreadcrumb(label, parentBreadcrumb, url);
            newContainer.breadcrumbList.push(breadcrumb);
            newContainer.currentSelectedBreadcrumb = breadcrumb;
        }
        else // TODO: this does not need to be nested.. create container if not existing, then create breadcrumb
        {
            // search for existing breadcrumb
            let foundBreadcrumb:TerraBreadcrumb = container.breadcrumbList.find((bc:TerraBreadcrumb) =>
            {
                return bc.routerLink === url;
            });

            // breadcrumb not found
            if(isNullOrUndefined(foundBreadcrumb))
            {
                let breadcrumb:TerraBreadcrumb = new TerraBreadcrumb(label, previousContainer.currentSelectedBreadcrumb, url);
                container.breadcrumbList.push(breadcrumb);
                container.currentSelectedBreadcrumb = breadcrumb;
                this.updateBreadcrumbVisibilities(container, breadcrumb.parent);
            }
            else
            {
                container.currentSelectedBreadcrumb = foundBreadcrumb;
                this.updateBreadcrumbVisibilities(container, foundBreadcrumb.parent);
            }
        }
    }

    private updateBreadcrumbVisibilities(breadcrumbContainer:TerraBreadcrumbContainer, parentBreadcrumb:TerraBreadcrumb):void
    {
        breadcrumbContainer.breadcrumbList.forEach((bc:TerraBreadcrumb) =>
        {
            bc.isHidden = bc.parent !== parentBreadcrumb;
        });
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

            if(splittedFlatPath.length === splittedRoutePath.length)
            {
                for(let path of splittedRoutePath)
                {
                    if(path.startsWith(':'))
                    {
                        let index:number = splittedRoutePath.indexOf(path);
                        parameterisedRoutes[path] = index;
                    }
                }
            }

            Object.keys(parameterisedRoutes).forEach((key:string) =>
            {
                let index:number = parameterisedRoutes[key];

                splittedRoutePath[index] = splittedFlatPath[index];
            });

            let gluedRoutePath:string = splittedRoutePath.join('/');

            return !isNullOrUndefined(route.path) &&
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
        let breadcrumbIndex:number = breadcrumbList.indexOf(breadcrumb);

        // current selected breadcrumb should be closed?
        if(breadcrumbContainer.currentSelectedBreadcrumb === breadcrumb)
        {
            // get the first remaining breadcrumb
            let breadcrumbToSelect:TerraBreadcrumb = breadcrumbIndex === 0 ? breadcrumbList[1] : breadcrumbList[0];
            breadcrumbContainer.currentSelectedBreadcrumb = breadcrumbToSelect;
            this.router.navigateByUrl(breadcrumbContainer.currentSelectedBreadcrumb.routerLink);
        }

        // delete all related breadcrumbs
        let currentContainerIndex:number = this._breadcrumbContainer.indexOf(breadcrumbContainer);
        let nextContainer:TerraBreadcrumbContainer = this._breadcrumbContainer[currentContainerIndex + 1];
        this.removeBreadcrumbsByParent(nextContainer, breadcrumb);

        // finally delete breadcrumb
        breadcrumbList.splice(breadcrumbIndex, 1);
    }

    private removeBreadcrumbsByParent(container:TerraBreadcrumbContainer, parent:TerraBreadcrumb):void
    {
        if(isNullOrUndefined(container))
        {
            return;
        }

        let currentContainerIndex:number = this._breadcrumbContainer.indexOf(container);
        let nextContainer:TerraBreadcrumbContainer = this._breadcrumbContainer[currentContainerIndex + 1];
        let filteredBreadcrumbList:Array<TerraBreadcrumb> = container.breadcrumbList.filter((bc:TerraBreadcrumb) =>
        {
            if(bc.parent === parent && !isNullOrUndefined(nextContainer))
            {
                this.removeBreadcrumbsByParent(nextContainer, bc);
            }

            return bc.parent !== parent;
        });

        if(filteredBreadcrumbList.length === 0)
        {
            // remove container
            this._breadcrumbContainer.splice(currentContainerIndex, 1);
        }
        else
        {
            // update breadcrumb list
            container.breadcrumbList = filteredBreadcrumbList;
        }
    }
}
