/* tslint:disable:max-function-line-count max-file-line-count max-depth member-ordering*/
// Adding disable only because of the deprecated state of the component!
import {
    Component,
    HostListener,
    Input,
    NgZone,
    OnDestroy,
    OnInit
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraMultiSplitViewConfig } from './injectables/terra-multi-split-view.config';
import { TerraMultiSplitViewModuleInterface } from './interfaces/terra-multi-split-view-module.interface';
import { TerraMultiSplitViewInterface } from './interfaces/terra-multi-split-view.interface';
import * as AngularRouter from '@angular/router'; // Required to use both Angular Router Events and ES6 Events
import {
    NavigationEnd,
    NavigationStart,
    Router,
    Routes
} from '@angular/router';
import { Route } from '@angular/router/src/config';
import { UrlHelper } from '../../../helpers/url.helper';
import { TerraMultiSplitViewRoutes } from './interfaces/terra-multi-split-view-routes';
import { TerraMultiSplitViewBreadcrumbsService } from './injectables/terra-multi-split-view-breadcrumbs.service';
import { filter } from 'rxjs/operators';

import * as jquery_ from 'jquery';

const $:JQueryStatic = jquery_;


let nextSplitViewId:number = 0;

/**
 * @deprecated Will be removed in the next major release.
 */
@Component({
    selector:    'terra-multi-split-view',
    templateUrl: './terra-multi-split-view.component.html',
    styleUrls:   ['./terra-multi-split-view.component.scss'],
    providers:   [TerraMultiSplitViewBreadcrumbsService]
})
export class TerraMultiSplitViewComponent implements OnDestroy, OnInit
{
    public static ANIMATION_SPEED:number = 1000; // ms

    @Input()
    public inputConfig:TerraMultiSplitViewConfig;

    @Input()
    public inputShowBreadcrumbs:boolean;

    /**
     * @description adds/activates routing functionality to the split-view. Several dependencies need to be injected to the config as well.
     */
    @Input()
    public inputHasRouting:boolean;

    /**
     * @description local copy of the isNullOrUndefined function from "util" to be used in the template only!
     */
    public _isNullOrUndefined:(object:any) => object is null | undefined;

    public _mouseLeft:string = '0px';

    private _breadCrumbsPath:string;

    public _modules:Array<TerraMultiSplitViewModuleInterface> = [];

    private _resizeTimeout:any;

    public _splitViewId:number;

    private _componentRoute:string;

    constructor(private _zone:NgZone,
                private _router:Router,
                private _breadcrumbsService:TerraMultiSplitViewBreadcrumbsService)
    {
        this._isNullOrUndefined = isNullOrUndefined;
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
        this._splitViewId = nextSplitViewId++;
        this._componentRoute = this._searchAngularRoutes(this._router.url);
    }

    @HostListener('window:resize')
    public onWindowResize():void
    {
        this._zone.runOutsideAngular(():void =>
            {
                // debounce resize, wait for resize to finish before updating the viewport
                if(this._resizeTimeout)
                {
                    clearTimeout(this._resizeTimeout);
                }
                this._resizeTimeout = setTimeout((():void =>
                    {
                        if(this.inputConfig.currentSelectedView)
                        {
                            this.updateViewport(this.inputConfig.currentSelectedView, true);
                        }
                    }
                ).bind(this), 500);
            }
        );
    }

    public ngOnDestroy():void
    {
        this.inputConfig.reset();
    }

    public ngOnInit():void
    {
        this.inputConfig.splitViewComponent = this;

        // catch routing events, but only those that select the tab where the split view is instantiated
        if(!isNullOrUndefined(this._router) && !isNullOrUndefined(this._componentRoute))
        {
            // check if the given route exists in the route config
            if(this._routeExists(this._componentRoute))
            {
                if(this.inputHasRouting)
                {
                    this._router.events.pipe(filter((event:AngularRouter.Event) =>
                        event instanceof NavigationEnd && event.url.startsWith(this._componentRoute)
                    )).subscribe((event:NavigationEnd) =>
                    {
                        if(this.inputConfig.currentSelectedView && (this._componentRoute + this.inputConfig.currentSelectedView.url === event.url))
                        {
                            this.updateViewport(this.inputConfig.currentSelectedView, true);
                        }
                        else
                        {
                            this.inputConfig.navigateToViewByUrl(event.url);
                        }
                    });

                    this.inputConfig.navigateToViewByUrl(this._router.url);
                }
                else
                {
                    this._router.events.pipe(filter((event:AngularRouter.Event) =>
                        event instanceof NavigationStart && event.url === this._componentRoute
                    )).subscribe((path:NavigationStart) =>
                    {
                        this.updateViewport(this.inputConfig.currentSelectedView, true);
                    });
                }
            }
        }
    }

    public get componentRoute():string
    {
        return this._componentRoute;
    }

    public addToModulesIfNotExist(view:TerraMultiSplitViewInterface):void
    {
        // check whether view is null or undefined
        if(isNullOrUndefined(view))
        {
            return;
        }

        // get hierarchy level of selected view
        let hierarchyLevel:number = this._getHierarchyLevelOfView(view);

        // check if modules array is not initialized
        if(isNullOrUndefined(this._modules[hierarchyLevel]))
        {
            this._modules.push(
                {
                    views:               [],
                    identifier:          view.mainComponentName,
                    width:               view.focusedWidth ? view.focusedWidth : view.defaultWidth,
                    currentSelectedView: view
                }
            );
        }

        // get the module of the hierarchy
        let module:TerraMultiSplitViewModuleInterface = this._modules[hierarchyLevel];

        // initialize views array if null or undefined
        if(isNullOrUndefined(module.views))
        {
            module.views = [];
        }

        // check if view is already added to module's views array
        if(!module.views.find((elem:TerraMultiSplitViewInterface) => elem === view))
        {
            // add view to the module's views array
            module.views.push(view);
        }
    }

    public setSelectedView(view:TerraMultiSplitViewInterface):void
    {
        // check whether view is defined
        if(isNullOrUndefined(view))
        {
            return;
        }

        // check whether the view's module is defined
        let module:TerraMultiSplitViewModuleInterface = this._getModuleOfView(view);
        if(isNullOrUndefined(module))
        {
            return;
        }

        // check if view is already selected
        if(this.inputConfig.currentSelectedView === view)
        {
            // stop execution, since the view is already selected
            return;
        }

        if(!isNullOrUndefined(this.inputConfig.selectBreadcrumbEventEmitter))
        {
            this.inputConfig.selectBreadcrumbEventEmitter.next(view);
        }

        // check whether the view is already opened
        if(module.currentSelectedView === view)
        {
            // also set the width of the view
            module.width = !isNullOrUndefined(view.focusedWidth) ? view.focusedWidth : view.defaultWidth;
        }
        // vertical selection has changed
        else
        {
            // check if parent views are selected
            let parent:TerraMultiSplitViewInterface = view;
            while(!isNullOrUndefined(parent))
            {
                let parentModule:TerraMultiSplitViewModuleInterface = this._getModuleOfView(parent);
                if(parentModule)
                {
                    if(!(parentModule.currentSelectedView === parent))
                    {
                        if(parent.parent)
                        {
                            parentModule.views = parent.parent.children;
                        }
                        parentModule.currentSelectedView = parent;
                    }
                }
                parent = parent.parent;
            }

            // rebuild modules for children views
            this._rebuildModules(view, module);
        }

        // if module has changed horizontally
        let inputModule:TerraMultiSplitViewModuleInterface = this._getModuleOfView(this.inputConfig.currentSelectedView);
        if(inputModule !== this._getModuleOfView(view)
           && !isNullOrUndefined(inputModule)) // this has to be checked, since a module can be removed and hence isn't existing anymore
        {
            inputModule.width = this.inputConfig.currentSelectedView.defaultWidth;
        }

        this.inputConfig.currentSelectedView = view;
        this.updateViewport(view);
        this._updateBreadCrumbs();
        this._updateBreadcrumbsList();
    }

    private _updateBreadcrumbsList():void
    {
        this._breadcrumbsService.breadcrumbList[this._componentRoute] =
            this._modules.map((module:TerraMultiSplitViewModuleInterface) =>
            {
                return module.currentSelectedView.name;
            });
    }

    private _updateBreadCrumbs():void
    {
        this._zone.runOutsideAngular(() =>
        {
            // init breadcrumb sliding
            setTimeout(function():void
            {
                $('.terra-breadcrumbs').each(function():void
                {
                    $(this).find('li').each(function():void
                    {
                        let viewContainer:JQuery = $(this).closest('.terra-breadcrumbs');
                        let viewContainerOffsetLeft:number = viewContainer.offset().left;
                        let viewContainerWidth:number = viewContainer.width();

                        $(this).off();
                        $(this).mouseenter(function():void
                        {
                            let elementWidth:number = $(this).width();
                            let elementOffsetLeft:number = $(this).offset().left;
                            let viewContainerScrollLeft:number = viewContainer.scrollLeft();
                            let offset:number = 0;

                            if(elementOffsetLeft < viewContainer.offset().left)
                            {
                                offset = viewContainerScrollLeft + elementOffsetLeft - 10;
                            }
                            else if(elementOffsetLeft + elementWidth + 30 > viewContainerOffsetLeft + viewContainerWidth)
                            {
                                offset = viewContainerScrollLeft + elementOffsetLeft + elementWidth + 30 - viewContainerWidth;
                            }
                            else
                            {
                                return;
                            }
                            viewContainer.stop();
                            viewContainer.animate({scrollLeft: offset}, 1200);
                        });
                    });
                });
            });
        });
    }

    public updateViewport(view:TerraMultiSplitViewInterface, skipAnimation?:boolean):void
    {
        // check if view is defined
        if(isNullOrUndefined(view))
        {
            return;
        }

        this._zone.runOutsideAngular(() =>
        {
            let splitViewId:number = this._splitViewId;
            setTimeout(function():void
            {
                let id:string = view.mainComponentName;

                let parent:TerraMultiSplitViewInterface = view.parent;
                let moduleIndex:number = 0;

                while(!isNullOrUndefined(parent))
                {
                    parent = parent.parent;
                    moduleIndex++;
                }

                let anchor:JQuery = $('#splitview' + splitViewId + '_module' + moduleIndex);
                let currentBreadcrumb:JQuery = $('.' + id); // TODO: vwiebe, fix scope
                let breadCrumbContainer:JQuery = currentBreadcrumb.closest('.terra-breadcrumbs');
                let viewContainer:JQuery = anchor.parent();

                // focus breadcrumbs
                if(!isNullOrUndefined(currentBreadcrumb[0]))
                {
                    breadCrumbContainer.stop();
                    breadCrumbContainer.animate(
                        {scrollLeft: (currentBreadcrumb[0].getBoundingClientRect().left + breadCrumbContainer.scrollLeft())},
                        this.ANIMATION_SPEED);
                }

                // check if viewport needs to be adjusted
                if(!isNullOrUndefined(anchor[0]) &&
                   anchor[0].getBoundingClientRect().left > viewContainer.offset().left &&
                   anchor[0].getBoundingClientRect().right <= viewContainer.offset().left + viewContainer.outerWidth())
                {
                    return;
                }

                // interrupt all ongoing animations to prevent queue
                viewContainer.stop();

                if(isNullOrUndefined(anchor[0]))
                {
                    return;
                }

                // focus view horizontally
                if(skipAnimation)
                {
                    viewContainer.scrollLeft(
                        Math.ceil(anchor[0].getBoundingClientRect().left + viewContainer.scrollLeft() - viewContainer.offset().left));
                }
                else
                {
                    viewContainer.animate(
                        {scrollLeft: (Math.ceil(anchor[0].getBoundingClientRect().left + viewContainer.scrollLeft() - viewContainer.offset().left))},
                        this.ANIMATION_SPEED);
                }
            });
        });
    }

    private _rebuildModules(view:TerraMultiSplitViewInterface, module:TerraMultiSplitViewModuleInterface):void
    {
        if(isNullOrUndefined(view))
        {
            return;
        }

        let hierarchyLevel:number = this._getHierarchyLevelOfView(view);

        // cut off last elements if existing
        if(this._modules.length > hierarchyLevel)
        {
            this._modules = this._modules.slice(0, hierarchyLevel + 1);
        }

        // rebuild
        if(!isNullOrUndefined(view.children))
        {
            view.children.forEach((child:TerraMultiSplitViewInterface) =>
                {
                    // add view to the modules array
                    this.addToModulesIfNotExist(child);

                    // set selected view and rebuild sub tree for children
                    this.setSelectedView(child);
                }
            );
        }

        // update the corresponding module's current- and lastSelectedView
        let moduleView:TerraMultiSplitViewInterface = module.views.find((v:TerraMultiSplitViewInterface) => v === view);

        // an existing view has been SELECTED?
        if(moduleView)
        {
            module.lastSelectedView = module.currentSelectedView;
            module.currentSelectedView = view;

            // also set the width of the view
            module.width = !isNullOrUndefined(view.focusedWidth) ? view.focusedWidth : view.defaultWidth;
        }
    }

    public removeFromModules(view:TerraMultiSplitViewInterface):TerraMultiSplitViewInterface
    {
        // check whether view is null or undefined
        if(isNullOrUndefined(view))
        {
            // ERROR... stop further execution
            return view;
        }

        // get the corresponding module
        let module:TerraMultiSplitViewModuleInterface = this._getModuleOfView(view);

        // check whether module is defined
        if(isNullOrUndefined(module))
        {
            // ERROR... stop further execution
            return view;
        }

        // delete all children only if the view is selected and the children are rendered
        if(view === module.currentSelectedView)
        {
            if(!isNullOrUndefined(view.children))
            {
                view.children.forEach((elem:TerraMultiSplitViewInterface) =>
                    {
                        this.removeFromModules(elem);
                    }
                );
            }
        }

        // check if module has more than one view
        if(module.views.length <= 1)
        {
            // get the index of the module in the modules array
            let moduleIndex:number = this._modules.findIndex((mod:TerraMultiSplitViewModuleInterface) => mod === module);

            // check if the module has been found
            if(moduleIndex >= 0 && moduleIndex < this._modules.length)
            {
                // remove the whole module
                this._modules.splice(moduleIndex, 1);

                // select the views parent view
                return view.parent;
            }
        }
        else
        {
            // get the index of the view in the module's views array
            let viewIndex:number = module.views.findIndex((elem:TerraMultiSplitViewInterface) => elem === view);

            // check if the view has been found
            if(viewIndex >= 0 && viewIndex < module.views.length)
            {
                // remove view from module's views array
                module.views.splice(viewIndex, 1);
            }

            // return the view that should be selected after deletion
            if(module.currentSelectedView === view && this.inputConfig.currentSelectedView === view)
            {
                return this._getLastSelectedOfModule(module);
            }
            else
            {
                // check if vertical selection has to be changed
                if(module.currentSelectedView === view)
                {
                    // rebuild modules array depending on the selected view
                    this._rebuildModules(this._getLastSelectedOfModule(module), module);

                }
                // do not change anything -> select the currently selected view
                return this.inputConfig.currentSelectedView;
            }
        }
    }

    protected _getModuleOfView(view:TerraMultiSplitViewInterface):TerraMultiSplitViewModuleInterface
    {
        // get hierarchy level of deleted view
        let hierarchyLevel:number = this._getHierarchyLevelOfView(view);

        return this._modules[hierarchyLevel];
    }

    private _getHierarchyLevelOfView(view:TerraMultiSplitViewInterface):number
    {
        let hierarchyLevel:number = 0;
        let parent:TerraMultiSplitViewInterface = view.parent;
        while(!isNullOrUndefined(parent))
        {
            parent = parent.parent;
            hierarchyLevel++;
        }

        return hierarchyLevel;
    }

    public resizeViewAndModule(view:TerraMultiSplitViewInterface):void
    {
        let module:TerraMultiSplitViewModuleInterface = this._getModuleOfView(view);

        module.width = view.defaultWidth;
    }

    public _removeView(view:TerraMultiSplitViewInterface, event:Event):void
    {
        // stop event bubbling
        event.stopPropagation();

        // remove the selected view
        this.inputConfig.removeView(view);
    }

    private _routeExists(route:string):boolean
    {
        let noLeadingSlash:string = UrlHelper.removeLeadingSlash(route);
        let routeParts:Array<string> = noLeadingSlash.split('/');

        let routeLevel:number = 0;

        // get the routing config
        let registeredRoutes:TerraMultiSplitViewRoutes = this._router.config as TerraMultiSplitViewRoutes;

        // scan the routing config
        while(routeLevel < routeParts.length)
        {
            if(isNullOrUndefined(registeredRoutes))
            {
                return false;
            }

            // search the array for the route partial
            let foundRoute:Route = registeredRoutes.find(
                (registeredRoute:Route) => registeredRoute.path === routeParts[routeLevel]);
            if(foundRoute) // the route partial is defined?
            {
                // into deep
                routeLevel++;
                registeredRoutes = foundRoute.children as TerraMultiSplitViewRoutes;
            }
            else
            {
                return false;
            }
        }

        // if the while loop ends, the route exists
        return true;
    }

    private _getLastSelectedOfModule(module:TerraMultiSplitViewModuleInterface):TerraMultiSplitViewInterface
    {
        if(module.lastSelectedView && module.views.find((v:TerraMultiSplitViewInterface) => v === module.lastSelectedView))
        {
            return module.lastSelectedView;
        }

        // select the first view in the views array
        return module.views[0];
    }

    public handleBreadCrumbClick(view:TerraMultiSplitViewInterface, event?:MouseEvent):void
    {
        // prevent event bubbling
        if(event)
        {
            event.stopPropagation();
        }

        this.setSelectedView(view);
    }

    // TODO: The same functionality as TerraRouterHelper.getRouteBaseUrl()
    private _searchAngularRoutes(url:string):string
    {
        let urlWithoutLeadingSlash:string = UrlHelper.removeLeadingSlash(url);
        let urlParts:Array<string> = urlWithoutLeadingSlash.split('/');
        let urlPart:string = urlParts.shift();
        let routes:Routes = this._router.config;
        let route:Route = this._findRouteByPath(urlPart, routes);
        let baseUrl:string = '';

        while(!isNullOrUndefined(route) && urlParts.length > 0)
        {
            baseUrl += '/' + route.path;
            routes = route.children;
            urlPart = urlParts.shift();
            route = this._findRouteByPath(urlPart, routes);
        }

        if(isNullOrUndefined(route) && !isNullOrUndefined(routes) && !isNullOrUndefined(routes[0]) && routes[0].path === '**')
        {
            return baseUrl;
        }

        if(urlParts.length === 0 && !isNullOrUndefined(route))
        {
            return baseUrl + '/' + route.path;
        }

        return undefined;
    }

    private _findRouteByPath(routePath:string, routeConfig:Routes):Route
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

    public _calculatePosition(container:HTMLLIElement, contextMenu:HTMLUListElement):void
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

        this._mouseLeft = left + 'px';
    }
}
