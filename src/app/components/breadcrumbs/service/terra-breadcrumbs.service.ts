import { Injectable } from '@angular/core';
import { TerraBreadcrumb } from '../terra-breadcrumb';
import {
    ActivatedRouteSnapshot,
    NavigationEnd,
    Route,
    Router,
    RouterEvent,
    Routes,
    UrlSerializer
} from '@angular/router';
import { isNullOrUndefined } from 'util';
import { TranslationService } from 'angular-l10n';
import { TerraBreadcrumbContainer } from '../terra-breadcrumb-container';
import { UrlHelper } from '../../../helpers/url.helper';
import { StringHelper } from '../../../helpers/string.helper';
import { ActivatedRouteHelper } from '../../../helpers/activated-route.helper';

@Injectable()
export class TerraBreadcrumbsService
{
    private _containers:Array<TerraBreadcrumbContainer> = [];

    private _initialPath:string;
    private initialRoute:Route;

    constructor(private router:Router,
                private translation:TranslationService,
                private urlSerializer:UrlSerializer)
    {
        this.router.events.filter((event:RouterEvent) =>
        {
            return event instanceof NavigationEnd // navigation is done
                   && !isNullOrUndefined(this._initialPath) // initialPath is set
                   && event.urlAfterRedirects.startsWith(this._initialPath); // url starts with the initial path
        }).subscribe((event:NavigationEnd) =>
        {
            if(!isNullOrUndefined(this.initialRoute.children))
            {
                let cleanEventUrl:string = '/' + UrlHelper.getCleanUrl(event.urlAfterRedirects);
                let shortUrl:string = cleanEventUrl.replace(this._initialPath, '');

                let urlParts:Array<string> = shortUrl.split('/');
                let urls:Array<string> = urlParts.map((urlPart:string, index:number) => urlParts.slice(0, index + 1).join('/'));
                urls.forEach((url:string) =>
                {
                    this.handleBreadcrumbForUrl(url, this._initialPath + url, cleanEventUrl);
                });

                // update breadcrumb visibility for containers that have not been checked since the url is to short
                if(urlParts.length < this._containers.length)
                {
                    for(let j:number = urlParts.length; j < this._containers.length; j++)
                    {
                        this.updateBreadcrumbVisibilities(
                            this._containers[j],
                            this._containers[j - 1].currentSelectedBreadcrumb
                        );
                    }
                }
            }
        });
    }

    /**
     * @deprecated use set accessor for activatedRoute instead.
     * @param value
     */
    public set initialPath(value:string)
    {
        this._containers = [];
        this._initialPath = value;
        this.initialRoute = this.findRoute(value, this.router.config);
    }

    public set activatedRoute(activatedRoute:ActivatedRouteSnapshot)
    {
        this._containers = [];
        this._initialPath = ActivatedRouteHelper.getBasePathForActivatedRoute(activatedRoute);
        this.initialRoute = activatedRoute.routeConfig;
    }

    public get containers():Array<TerraBreadcrumbContainer>
    {
        return this._containers;
    }

    private handleBreadcrumbForUrl(shortUrl:string, fullUrl:string, cleanEventUrl:string):void
    {
        let route:Route = this.findRoute(shortUrl, this.initialRoute.children);
        this.handleBreadcrumb(route, fullUrl, cleanEventUrl, shortUrl.split('/').length - 1);
    }

    private handleBreadcrumb(route:Route, url:string, cleanEventUrl:string, urlPartsCount:number):void
    {
        if(isNullOrUndefined(route))
        {
            return;
        }

        // search for existing container - create new container if not existing
        let container:TerraBreadcrumbContainer = this._containers[urlPartsCount];
        if(isNullOrUndefined(container))
        {
            container = new TerraBreadcrumbContainer();
            this._containers.push(container);
        }

        // search for existing breadcrumb
        let breadcrumb:TerraBreadcrumb = container.breadcrumbList.find((bc:TerraBreadcrumb) =>
        {
            return bc.routerLink === url;
        });

        // breadcrumb not found
        if(isNullOrUndefined(breadcrumb))
        {
            let activatedSnapshot:ActivatedRouteSnapshot = this.findActivatedRouteSnapshot(this.router.routerState.snapshot.root);
            let label:string = this.getBreadcrumbLabel(route, activatedSnapshot);
            let currentContainerIndex:number = this._containers.indexOf(container);
            let previousContainer:TerraBreadcrumbContainer = this._containers[currentContainerIndex - 1];
            let parentBreadcrumb:TerraBreadcrumb = isNullOrUndefined(previousContainer) ? undefined : previousContainer.currentSelectedBreadcrumb;

            if(UrlHelper.getCleanUrl(cleanEventUrl) === UrlHelper.getCleanUrl(url))
            {
                breadcrumb = new TerraBreadcrumb(label, parentBreadcrumb, url, activatedSnapshot.queryParams);
            }
            else
            {
                breadcrumb = new TerraBreadcrumb(label, parentBreadcrumb, url);
            }

            breadcrumb.hasRouteData = !isNullOrUndefined(route.data);

            container.breadcrumbList.push(breadcrumb);
        }

        // set container hidden if data is not available
        container.isHidden = container.breadcrumbList.every((bc:TerraBreadcrumb) => !bc.hasRouteData);

        // select breadcrumb and update visibilities
        container.currentSelectedBreadcrumb = breadcrumb;
        this.updateBreadcrumbVisibilities(container, breadcrumb.parent);
    }

    private getBreadcrumbLabel(route:Route, activatedSnapshot:ActivatedRouteSnapshot):string
    {
        let label:string = '';
        if(!isNullOrUndefined(route.data))
        {
            if(typeof route.data.label === 'function')
            {
                label = route.data.label(this.translation, activatedSnapshot.params, activatedSnapshot.data, activatedSnapshot.queryParams);
            }
            else
            {
                label = this.translation.translate(route.data.label);
            }
        }
        return label;
    }

    private updateBreadcrumbVisibilities(breadcrumbContainer:TerraBreadcrumbContainer, parentBreadcrumb:TerraBreadcrumb):void
    {
        breadcrumbContainer.breadcrumbList.forEach((bc:TerraBreadcrumb) =>
        {
            bc.isHidden = bc.parent !== parentBreadcrumb || !isNullOrUndefined(bc.parent) && bc.parent.isHidden;
        });

        // is the current selected breadcrumb now hidden?
        if(breadcrumbContainer.currentSelectedBreadcrumb.isHidden)
        {
            // search for another breadcrumb to be selected that is not hidden
            let foundBreadcrumb:TerraBreadcrumb = breadcrumbContainer.breadcrumbList.find((bc:TerraBreadcrumb) => !bc.isHidden);
            if(!isNullOrUndefined(foundBreadcrumb))
            {
                breadcrumbContainer.currentSelectedBreadcrumb = foundBreadcrumb;
            }
        }
    }

    // same exists in TerraRouterHelper
    private findActivatedRouteSnapshot(activatedRouteSnapshot:ActivatedRouteSnapshot):ActivatedRouteSnapshot
    {
        if(!isNullOrUndefined(activatedRouteSnapshot.firstChild))
        {
            return this.findActivatedRouteSnapshot(activatedRouteSnapshot.firstChild);
        }

        return activatedRouteSnapshot;
    }

    private findRoute(url:string, routeConfig:Routes):Route
    {
        let urlParts:Array<string> = UrlHelper.removeLeadingSlash(url).split('/');
        let urlPart:string = urlParts.shift();

        let routes:Routes = routeConfig;
        let route:Route = routeConfig.find((routeToFind:Route) =>
        {
            return routeToFind.path === urlPart;
        });

        while(!isNullOrUndefined(route) && urlParts.length > 0)
        {
            if(!isNullOrUndefined(route.children))
            {
                routes = route.children;
                urlPart = urlParts.shift();
            }
            else
            {
                urlPart = urlPart + '/' + urlParts.shift();
            }

            route = routes.find((routeToFind:Route) =>
            {
                let splittedRoutePath:Array<string> = routeToFind.path.split('/');

                let parameterisedRoutes:{ [key:string]:number } = {};

                let splittedFlatPath:Array<string> = urlPart.split('/');

                splittedRoutePath.forEach((path:string, index:number) =>
                {
                    if(path.startsWith(':'))
                    {
                        parameterisedRoutes[path] = index;
                    }
                });

                Object.values(parameterisedRoutes).forEach((index:number) =>
                {
                    splittedRoutePath[index] = splittedFlatPath[index];
                });

                let gluedRoutePath:string = splittedRoutePath.join('/');

                return !StringHelper.isNullUndefinedOrEmpty(routeToFind.path) &&
                       urlPart === gluedRoutePath;
            });
        }

        return route;
    }

    public checkActiveRoute(breadcrumb:TerraBreadcrumb):boolean
    {
        let breadcrumbUrl:string = breadcrumb.routerLink;

        if(!isNullOrUndefined(breadcrumb.queryParams)
           && Object.getOwnPropertyNames(breadcrumb.queryParams).length > 0)
        {
            breadcrumbUrl = this.urlSerializer.serialize(
                this.router.createUrlTree([],
                    {
                        queryParams: breadcrumb.queryParams
                    }));
        }

        return (this.router.url === breadcrumbUrl);
    }

    /**
     * Close the breadcrumb by given url
     * @param {string} url Url to close the breadcrumb.
     */
    public closeBreadcrumbByUrl(url:string):void
    {
        let breadcrumb:TerraBreadcrumb = this.findBreadcrumbByUrl(url);
        let container:TerraBreadcrumbContainer = this.findBreadcrumbContainerByUrl(url);

        if(!isNullOrUndefined(breadcrumb))
        {
            this.closeBreadcrumb(container, breadcrumb);
        }
    }

    /**
     * Update the breadcrumb name by given url
     * @param {string} url Url to update the breadcrumb.
     * @param {string} name If not given, it will be automatically update the name by the label of the route data.
     */
    public updateBreadcrumbNameByUrl(url:string, name?:string):void
    {
        let breadcrumb:TerraBreadcrumb = this.findBreadcrumbByUrl(url);

        let shortUrlWithoutLeadingSlash:string = UrlHelper.removeLeadingSlash(url);
        let route:Route = this.findRoute(shortUrlWithoutLeadingSlash, this.initialRoute.children);

        if(!isNullOrUndefined(route) && !isNullOrUndefined(route.data) && !isNullOrUndefined(breadcrumb))
        {
            // you can set a name to update the breadcrumb name
            if(!isNullOrUndefined(name))
            {
                breadcrumb.name = this.translation.translate(name);
            }
            // or it will be updated automatically from it's route data
            else
            {
                let activatedSnapshot:ActivatedRouteSnapshot = this.findActivatedRouteSnapshot(this.router.routerState.snapshot.root);

                breadcrumb.name = this.getBreadcrumbLabel(route, activatedSnapshot);
            }
        }
    }

    private findBreadcrumbContainerByUrl(url:string):TerraBreadcrumbContainer
    {
        let urlPartsCount:number = url.split('/').length - 1;

        let container:TerraBreadcrumbContainer = this._containers[urlPartsCount];

        if(isNullOrUndefined(container))
        {
            console.error('No existing breadcrumb container found.');
        }

        return container;
    }

    private findBreadcrumbByUrl(url:string):TerraBreadcrumb
    {
        let container:TerraBreadcrumbContainer = this.findBreadcrumbContainerByUrl(url);

        let routerLink:string = this._initialPath + url;

        if(!isNullOrUndefined(container) &&
           !isNullOrUndefined(container.currentSelectedBreadcrumb) &&
           container.currentSelectedBreadcrumb.routerLink === routerLink)
        {
            return container.currentSelectedBreadcrumb;
        }
        else
        {
            return container.breadcrumbList.find((bc:TerraBreadcrumb) =>
            {
                return bc.routerLink === routerLink;
            });
        }
    }

    public closeBreadcrumb(breadcrumbContainer:TerraBreadcrumbContainer, breadcrumb:TerraBreadcrumb):void
    {
        let breadcrumbList:Array<TerraBreadcrumb> = breadcrumbContainer.breadcrumbList;
        let breadcrumbIndex:number = breadcrumbList.indexOf(breadcrumb);

        // current selected breadcrumb should be closed?
        if(breadcrumbContainer.currentSelectedBreadcrumb === breadcrumb)
        {
            let currentUrl:string = this.router.url;

            let currentSelectedContainer:TerraBreadcrumbContainer = this._containers.find((bcc:TerraBreadcrumbContainer) =>
            {
                return bcc.currentSelectedBreadcrumb.routerLink === currentUrl;
            });

            // get the first remaining breadcrumb
            breadcrumbContainer.currentSelectedBreadcrumb = breadcrumbIndex === 0 ? breadcrumbList[1] : breadcrumbList[0];

            let currentSelectedIndex:number = this._containers.indexOf(currentSelectedContainer);
            let breadcrumbContainerIndex:number = this._containers.indexOf(breadcrumbContainer);

            // container has no more breadcrumbs
            if(isNullOrUndefined(breadcrumbContainer.currentSelectedBreadcrumb))
            {
                this.removeBreadcrumbContainer(breadcrumbContainer);
            }
            // check indexes to start routing
            else if(currentSelectedIndex >= breadcrumbContainerIndex)
            {
                this.router.navigateByUrl(breadcrumbContainer.currentSelectedBreadcrumb.routerLink);
            }
        }

        // delete all related breadcrumbs
        let currentContainerIndex:number = this._containers.indexOf(breadcrumbContainer);
        let nextContainer:TerraBreadcrumbContainer = this._containers[currentContainerIndex + 1];
        this.removeBreadcrumbsByParent(nextContainer, breadcrumb);

        // finally delete breadcrumb
        breadcrumbList.splice(breadcrumbIndex, 1);
    }

    private removeBreadcrumbContainer(breadcrumbContainer:TerraBreadcrumbContainer):void
    {
        let index:number = this._containers.indexOf(breadcrumbContainer);

        if(index >= 0)
        {
            // delete current breadcrumb container
            this._containers.splice(index, 1);

            // get next breadcrumb container with the same index
            let nextContainer:TerraBreadcrumbContainer = this._containers[index];

            // if no more next container, select previous container and route to breadcrumb
            if(isNullOrUndefined(nextContainer))
            {
                let previousContainer:TerraBreadcrumbContainer = this._containers[index - 1];

                if(!isNullOrUndefined(previousContainer) && !isNullOrUndefined(previousContainer.currentSelectedBreadcrumb))
                {
                    this.router.navigateByUrl(previousContainer.currentSelectedBreadcrumb.routerLink);
                }
            }
            else
            {
                this.removeBreadcrumbContainer(nextContainer);
            }
        }
    }

    private removeBreadcrumbsByParent(container:TerraBreadcrumbContainer, parent:TerraBreadcrumb):void
    {
        if(isNullOrUndefined(container))
        {
            return;
        }

        let currentContainerIndex:number = this._containers.indexOf(container);
        let nextContainer:TerraBreadcrumbContainer = this._containers[currentContainerIndex + 1];
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
            this._containers.splice(currentContainerIndex, 1);
        }
        else
        {
            // update breadcrumb list
            container.breadcrumbList = filteredBreadcrumbList;
        }
    }
}
