import {
    EventEmitter,
    Injectable,
    Injector
} from '@angular/core';
import { TerraMultiSplitViewInterface } from '../interfaces/terra-multi-split-view.interface';
import { isNullOrUndefined } from 'util';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    ResolveData,
    Route,
    Router,
    RouterStateSnapshot,
    Routes
} from '@angular/router';
import { TerraDynamicLoadedComponentInputInterface } from '../../../dynamic-module-loader/data/terra-dynamic-loaded-component-input.interface';
import { TranslationService } from 'angular-l10n';
import { TerraMultiSplitViewComponent } from '../terra-multi-split-view.component';
import { ResolvedDataInterface } from '../interfaces/resolved-data.interface';
import { ResolverListItemInterface } from '../interfaces/resolve-list-item.interface';
import { TerraResolvedDataHelper } from '../helpers/terra-resolved-data.helper';
import { TerraMultiSplitViewHelper } from '../helpers/terra-multi-split-view.helper';

@Injectable()
export class TerraMultiSplitViewConfig
{
    public currentSelectedView:TerraMultiSplitViewInterface;
    public routingConfig:Routes = [];

    public deleteViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    public selectBreadcrumbEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();

    private views:Array<TerraMultiSplitViewInterface> = [];
    private routerStateSnapshot:RouterStateSnapshot;
    private activatedRouteSnapshot:ActivatedRouteSnapshot;

    private _splitViewComponent:TerraMultiSplitViewComponent;

    constructor(private router?:Router,
                private injector?:Injector,
                private translation?:TranslationService,
                private activatedRoute?:ActivatedRoute)
    {

    }

    public addView(view:TerraMultiSplitViewInterface, parent?:TerraMultiSplitViewInterface):void
    {
        if(view.parameter)
        {
            console.warn(
                'Property \'parameter\' is deprecated. It will be removed in one of the upcoming releases. Please use \'inputs\' instead.');
        }

        // TODO: setTimeout can be removed, if it is guaranteed that change detection is fired when adding a new view
        setTimeout(() =>
            {
                if(isNullOrUndefined(parent))
                {
                    if(isNullOrUndefined(this.currentSelectedView))
                    {
                        this.currentSelectedView = view;
                        this.views.push(view);
                    }
                    else
                    {
                        parent = this.currentSelectedView;
                    }
                }

                if(parent)
                {
                    view.parent = parent;

                    if(isNullOrUndefined(parent.children))
                    {
                        parent.children = [view];
                    }
                    else
                    {
                        let viewExist:boolean = false;

                        for(let child of parent.children)
                        {
                            // TODO very ugly way, maybe add an option to use an id?
                            if(TerraMultiSplitViewHelper.isSameView(view, child))
                            {
                                view = child;
                                viewExist = true;
                                break;
                            }
                        }

                        if(!viewExist)
                        {
                            parent.children.push(view);
                        }
                    }
                }

                // synchronize modules array with input config
                this._splitViewComponent.addToModulesIfNotExist(view);

                // set the selected view
                this._splitViewComponent.setSelectedView(view);
            }
        );
    }

    public removeView(view:TerraMultiSplitViewInterface):void
    {
        if(isNullOrUndefined(view))
        {
            return;
        }

        // update modules array
        let viewToSelect:TerraMultiSplitViewInterface = this._splitViewComponent.removeFromModules(view);

        // select the parent view
        this._splitViewComponent.handleBreadCrumbClick(viewToSelect);

        if(this.removeViewAndChildren(view))
        {
            // notify user
            this.deleteViewEventEmitter.next(view);
        }
    }

    private removeViewAndChildren(view:TerraMultiSplitViewInterface):boolean
    {
        if(view.children && view.children.length > 0)
        {
            view.children.forEach((child:TerraMultiSplitViewInterface) =>
            {
                this.removeViewAndChildren(child);
            });
        }

        let parent:TerraMultiSplitViewInterface = view.parent;
        let viewIndex:number = parent.children.findIndex((elem:TerraMultiSplitViewInterface) => elem === view);

        if(viewIndex >= 0)
        {
            parent.children.splice(viewIndex, 1);
            return true;
        }
        return false;
    }

    public resizeView(view:TerraMultiSplitViewInterface, width:string):void
    {
        view.defaultWidth = width;

        this._splitViewComponent.resizeViewAndModule(view);
    }

    public setSelectedView(view:TerraMultiSplitViewInterface):void
    {
        this._splitViewComponent.setSelectedView(view);
    }

    public reset():void
    {
        this.views = [];
        this.currentSelectedView = null;
        this.selectBreadcrumbEventEmitter.unsubscribe();
        this.selectBreadcrumbEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
    }

    public navigateToViewByUrl(url:string):void
    {
        if(!this._splitViewComponent.inputHasRouting)
        {
            console.warn('Routing is deactivated. If you want to use routing for the split-view set the components input "inputHasRouting"');
            return;
        }

        // check if the needed dependencies are injected
        if(isNullOrUndefined(this.router))
        {
            console.error(
                '_router is not defined.. Please inject the Router in your config-instance to make routing functionality available');
            return;
        }
        if(isNullOrUndefined(this.injector))
        {
            console.error(
                '_injector is not defined. Please inject the Injector in your config-instance to make routing functionality available');
            return;
        }
        if(isNullOrUndefined(this.translation))
        {
            console.error(
                '_translation is not defined. Please inject the TranslationService in your config-instance to make routing functionality available');
            return;
        }

        this.routerStateSnapshot = this.router.routerState.snapshot;
        this.activatedRouteSnapshot = this.activatedRoute.snapshot;
        let remainingUrl:string = url.replace(this._splitViewComponent.componentRoute, '');
        let redirectUrl:string = this.urlIsRedirected(remainingUrl);

        if(redirectUrl)
        {
            if(redirectUrl === 'invalidRoute')
            {
                this.router.navigate(['/error-page'],
                    {
                        queryParams: {
                            errorCode: 'invalidRoute',
                            errorUrl:  url
                        }
                    });
                return;
            }
            this.router.navigateByUrl(url + redirectUrl);
            return;
        }

        this.getResolveDataForUrl(remainingUrl, this.routingConfig);
    }

    private addOrSelectViewsByUrl(url:string, resolveData:Array<ResolvedDataInterface>):void
    {
        let views:Array<TerraMultiSplitViewInterface> = this.views;
        let routeConfig:Routes = this.routingConfig;

        let urlParts:Array<string> = url.split('/');

        let viewToSelect:TerraMultiSplitViewInterface;
        let partialRoute:string = '';

        urlParts.forEach((urlPart:string) =>
        {
            if(urlPart.length > 0)
            {
                partialRoute += '/' + urlPart;
            }
            let route:Route = routeConfig.find((r:Route) => this.isMatchingRoute(r, urlPart));
            if(route)
            {
                if(route.data && route.data.mainComponentName)
                {
                    let view:TerraMultiSplitViewInterface = views.find(
                        (v:TerraMultiSplitViewInterface) => this.viewForRoutePartExists(v, route, urlPart)
                    );

                    if(isNullOrUndefined(view))
                    {
                        this.addView(this.createNewViewByUrlPart(route, urlPart, partialRoute, resolveData), viewToSelect);
                        viewToSelect = null;
                    }
                    else
                    {
                        viewToSelect = view;
                        if(view.children && view.children.length > 0)
                        {
                            views = view.children;
                        }
                        else
                        {
                            views = [];
                        }
                        // TODO: reset inputs with new resolve data??
                    }
                }
                if(route.children && route.children.length > 0)
                {
                    routeConfig = route.children;
                }
                else
                {
                    routeConfig = [];
                }
            }
            else
            {
                console.error('Route not found');
            }
        });

        if(viewToSelect)
        {
            this.setSelectedView(viewToSelect);
        }
    }

    private viewForRoutePartExists(view:TerraMultiSplitViewInterface, route:Route, viewId:string):boolean
    {
        return view.mainComponentName === route.data.mainComponentName && isNullOrUndefined(view.id)
               || view.mainComponentName === route.data.mainComponentName && route.path.startsWith(':') && view.id && view.id === viewId;
    }

    private createNewViewByUrlPart(route:Route, urlPart:string, partialUrl:string,
                                   resolveData:Array<ResolvedDataInterface>):TerraMultiSplitViewInterface
    {
        let viewName:string;
        if(typeof route.data.name === 'function')
        {
            let res:ResolvedDataInterface = resolveData.find((data:ResolvedDataInterface) => data.urlPart === urlPart);
            if(!isNullOrUndefined(res))
            {
                let obj:ResolveData = {};
                res.resolves.forEach((resolve:TerraDynamicLoadedComponentInputInterface) =>
                {
                    obj[resolve.name] = resolve.value;
                });
                viewName = this.translation.translate(route.data.name(obj), {id: urlPart});
            }
        }
        else
        {
            viewName = this.translation.translate(route.data.name, {id: urlPart});
        }
        let newView:TerraMultiSplitViewInterface =
            {
                module:            route.data.module,
                name:              viewName,
                defaultWidth:      route.data.defaultWidth,
                focusedWidth:      route.data.focusedWidth ? route.data.focusedWidth : undefined,
                mainComponentName: route.data.mainComponentName,
                id:                route.path && route.path.startsWith(':') ? urlPart : undefined,
                url:               partialUrl
            };
        if(route.resolve)
        {
            let res:ResolvedDataInterface = resolveData.find((data:ResolvedDataInterface) => data.urlPart === urlPart);
            if(res)
            {
                newView.inputs = res.resolves;
            }
        }
        return newView;
    }

    private urlIsRedirected(url:string):string
    {
        let routeConfig:Routes = this.routingConfig;
        let views:Array<TerraMultiSplitViewInterface> = this.views;
        let urlParts:Array<string> = url.split('/');
        let route:Route;
        let isInvalidRoute:boolean = false;
        let view:TerraMultiSplitViewInterface;
        urlParts.forEach((urlPart:string) =>
        {
            route = routeConfig.find((r:Route) => this.isMatchingRoute(r, urlPart));
            if(route)
            {
                if(route.data && route.data.mainComponentName)
                {
                    view = views.find(
                        (v:TerraMultiSplitViewInterface) => this.viewForRoutePartExists(v, route, urlPart)
                    );

                    if(view)
                    {
                        if(view.children && view.children.length > 0)
                        {
                            views = view.children;
                        }
                        else
                        {
                            views = [];
                        }
                    }
                }

                if(route.children && route.children.length > 0)
                {
                    routeConfig = route.children;
                }
                else
                {
                    routeConfig = [];
                }
            }
            else
            {
                isInvalidRoute = true;
                return;
            }
        });
        if(isInvalidRoute)
        {
            return 'invalidRoute';
        }
        if(!view) // do not redirect if the view is already added
        {
            let rou:Route = routeConfig.find((r:Route) => r.path === '' && !isNullOrUndefined(r.redirectTo));
            if(rou)
            {
                return '/' + rou.redirectTo;
            }
        }
        return null;
    }

    private getResolveDataForUrl(url:string, routeConfig:Routes):void
    {
        let resolverList:Array<ResolverListItemInterface> = this.getResolversForUrl(url, routeConfig);
        let data:Array<ResolvedDataInterface> = [];
        this.activatedRouteSnapshot.params = {};
        this.resolveInSequence(url, resolverList, data);
    }

    private getResolversForUrl(url:string, routeConfig:Routes):Array<ResolverListItemInterface>
    {
        let urlParts:Array<string> = url.split('/');

        let resolverList:Array<ResolverListItemInterface> = [];
        urlParts.forEach((urlPart:string) =>
        {
            let route:Route = routeConfig.find((r:Route) => this.isMatchingRoute(r, urlPart));
            if(route)
            {
                if(route.resolve)
                {
                    Object.keys(route.resolve).forEach((elem:string) =>
                    {
                        let resolver:ResolverListItemInterface = {
                            urlPart:   urlPart,
                            routePath: route.path,
                            resolver:  {
                                key:     elem,
                                service: this.injector.get(route.resolve[elem])
                            }
                        };

                        if(isNullOrUndefined(resolverList))
                        {
                            resolverList = [resolver];
                        }
                        else
                        {
                            resolverList.push(resolver);
                        }
                    });
                }

                if(route.children && route.children.length > 0)
                {
                    routeConfig = route.children;
                }
            }
        });

        return resolverList;
    }

    private resolveInSequence(url:string,
                              resolverList:Array<ResolverListItemInterface>,
                              data:Array<ResolvedDataInterface>,
                              resolvedResolvers?:Array<ResolverListItemInterface>):void
    {
        if(isNullOrUndefined(resolvedResolvers))
        {
            resolvedResolvers = [];
        }

        if(isNullOrUndefined(resolverList) || resolverList.length === 0)
        {
            // all data resolved go to view addition/selection
            this.addOrSelectViewsByUrl(url, data);
            return;
        }

        let resolverListItem:ResolverListItemInterface = resolverList.shift();
        if(!isNullOrUndefined(resolverListItem.routePath) && resolverListItem.routePath.startsWith(':'))
        {
            this.activatedRouteSnapshot.params[resolverListItem.routePath.substring(1)] = resolverListItem.urlPart; // pass route params
        }

        let resolvedResolver:ResolverListItemInterface = resolvedResolvers.find((res:ResolverListItemInterface) =>
            Object.getPrototypeOf(res.resolver.service) === Object.getPrototypeOf(resolverListItem.resolver.service)
        );
        if(!isNullOrUndefined(resolvedResolver)) // resolve resolvers only once for a route
        {
            let inputData:TerraDynamicLoadedComponentInputInterface =
                TerraResolvedDataHelper.findInputDataByResolveKey(resolvedResolver.urlPart, resolvedResolver.resolver.key, data);
            data = TerraResolvedDataHelper.addResolvedData(resolverListItem, inputData.value, data);

            // go to the next resolver
            this.resolveInSequence(url, resolverList, data, resolvedResolvers);
        }
        else
        {
            resolverListItem.resolver.service.resolve(this.activatedRouteSnapshot, this.routerStateSnapshot).subscribe((res:any) =>
            {
                resolvedResolvers.push(resolverListItem);

                data = TerraResolvedDataHelper.addResolvedData(resolverListItem, res, data);

                // go to the next resolver
                this.resolveInSequence(url, resolverList, data, resolvedResolvers);
            });
        }

    }

    public set splitViewComponent(value:TerraMultiSplitViewComponent)
    {
        this._splitViewComponent = value;
    }

    private isMatchingRoute(route:Route, routePath:string):boolean
    {
        return !isNullOrUndefined(route) &&
               (!isNullOrUndefined(route.path) && (route.path === routePath || route.path.startsWith(':')) ||
                (route === this.routingConfig[0] && isNullOrUndefined(route.path)));
    }

    public get baseRoute():string
    {
        return this._splitViewComponent.componentRoute;
    }
}
