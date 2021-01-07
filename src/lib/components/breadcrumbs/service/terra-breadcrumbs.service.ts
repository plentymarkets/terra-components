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
import { L10nTranslationService } from 'angular-l10n';
import { TerraBreadcrumbContainer } from '../terra-breadcrumb-container';
import { UrlHelper } from '../../../helpers/url.helper';
import { StringHelper } from '../../../helpers/string.helper';
import { ActivatedRouteHelper } from '../../../helpers/activated-route.helper';
import { filter } from 'rxjs/operators';

@Injectable()
export class TerraBreadcrumbsService {
    private _containers: Array<TerraBreadcrumbContainer> = [];

    private _initialPath: string;
    private _initialRoute: Route;

    constructor(
        private readonly _router: Router,
        private readonly _translation: L10nTranslationService,
        private readonly _urlSerializer: UrlSerializer
    ) {
        this._router.events
            .pipe(
                filter((event: RouterEvent) => {
                    return (
                        event instanceof NavigationEnd && // navigation is done
                        !(this._initialPath === null || this._initialPath === undefined) && // initialPath is set
                        event.urlAfterRedirects.startsWith(this._initialPath)
                    ); // url starts with the initial path
                })
            )
            .subscribe((event: NavigationEnd) => {
                if (!(this._initialRoute.children === null || this._initialRoute.children === undefined)) {
                    const cleanEventUrl: string = '/' + UrlHelper.getCleanUrl(event.urlAfterRedirects);
                    const shortUrl: string = cleanEventUrl.replace(this._initialPath, '');

                    const urlParts: Array<string> = shortUrl.split('/');
                    const urls: Array<string> = urlParts.map((urlPart: string, index: number) =>
                        urlParts.slice(0, index + 1).join('/')
                    );
                    urls.forEach((url: string) => {
                        this._handleBreadcrumbForUrl(url, this._initialPath + url, cleanEventUrl);
                    });

                    // update breadcrumb visibility for containers that have not been checked since the url is to short
                    if (urlParts.length < this._containers.length) {
                        for (let j: number = urlParts.length; j < this._containers.length; j++) {
                            this._updateBreadcrumbVisibilities(
                                this._containers[j],
                                this._containers[j - 1].currentSelectedBreadcrumb
                            );
                        }
                    }
                }
            });
    }

    public set activatedRoute(activatedRoute: ActivatedRouteSnapshot) {
        this._containers = [];
        this._initialPath = ActivatedRouteHelper.getBasePathForActivatedRoute(activatedRoute);
        this._initialRoute = activatedRoute.routeConfig;
    }

    public get containers(): Array<TerraBreadcrumbContainer> {
        return this._containers;
    }

    public checkActiveRoute(breadcrumb: TerraBreadcrumb): boolean {
        let breadcrumbUrl: string = breadcrumb.routerLink;

        if (
            !(breadcrumb.queryParams === null || breadcrumb.queryParams === undefined) &&
            Object.getOwnPropertyNames(breadcrumb.queryParams).length > 0
        ) {
            breadcrumbUrl = this._urlSerializer.serialize(
                this._router.createUrlTree([], {
                    queryParams: breadcrumb.queryParams
                })
            );
        }

        return this._router.url === breadcrumbUrl;
    }

    /**
     * Close the breadcrumb by given url
     * @param url Url to close the breadcrumb.
     */
    public closeBreadcrumbByUrl(url: string): void {
        const breadcrumb: TerraBreadcrumb = this._findBreadcrumbByUrl(url);
        const container: TerraBreadcrumbContainer = this._findBreadcrumbContainerByUrl(url);

        if (!(breadcrumb === null || breadcrumb === undefined)) {
            this.closeBreadcrumb(container, breadcrumb);
        }
    }

    /**
     * Update the breadcrumb name by given url
     * @param url Url to update the breadcrumb.
     * @param name If not given, it will be automatically update the name by the label of the route data.
     */
    public updateBreadcrumbNameByUrl(url: string, name?: string): void {
        const breadcrumb: TerraBreadcrumb = this._findBreadcrumbByUrl(url);

        const shortUrlWithoutLeadingSlash: string = UrlHelper.removeLeadingSlash(url);
        const route: Route = this._findRoute(shortUrlWithoutLeadingSlash, this._initialRoute.children);

        if (!isNullOrUndefined(route?.data) && !(breadcrumb === null || breadcrumb === undefined)) {
            // you can set a name to update the breadcrumb name
            if (!(name === null || name === undefined)) {
                breadcrumb.name = this._translation.translate(name);
            }
            // or it will be updated automatically from it's route data
            else {
                const activatedSnapshot: ActivatedRouteSnapshot = this._findActivatedRouteSnapshot(
                    this._router.routerState.snapshot.root
                );

                breadcrumb.name = this._getBreadcrumbLabel(route, activatedSnapshot);
            }
        }
    }

    public closeBreadcrumb(breadcrumbContainer: TerraBreadcrumbContainer, breadcrumb: TerraBreadcrumb): void {
        const breadcrumbList: Array<TerraBreadcrumb> = breadcrumbContainer.breadcrumbList;
        const breadcrumbIndex: number = breadcrumbList.indexOf(breadcrumb);

        // current selected breadcrumb should be closed?
        if (breadcrumbContainer.currentSelectedBreadcrumb === breadcrumb) {
            const currentUrl: string = this._router.url;

            const currentSelectedContainer: TerraBreadcrumbContainer = this._containers.find(
                (bcc: TerraBreadcrumbContainer) => {
                    return bcc.currentSelectedBreadcrumb.routerLink === currentUrl;
                }
            );

            // get the first remaining breadcrumb
            breadcrumbContainer.currentSelectedBreadcrumb =
                breadcrumbIndex === 0 ? breadcrumbList[1] : breadcrumbList[0];

            const currentSelectedIndex: number = this._containers.indexOf(currentSelectedContainer);
            const breadcrumbContainerIndex: number = this._containers.indexOf(breadcrumbContainer);

            // container has no more breadcrumbs
            if (
                breadcrumbContainer.currentSelectedBreadcrumb === null ||
                breadcrumbContainer.currentSelectedBreadcrumb === undefined
            ) {
                this._removeBreadcrumbContainer(breadcrumbContainer);
            }
            // check indexes to start routing
            else if (currentSelectedIndex >= breadcrumbContainerIndex) {
                this._router.navigateByUrl(breadcrumbContainer.currentSelectedBreadcrumb.routerLink);
            }
        }

        // deconste all related breadcrumbs
        const currentContainerIndex: number = this._containers.indexOf(breadcrumbContainer);
        const nextContainer: TerraBreadcrumbContainer = this._containers[currentContainerIndex + 1];
        this._removeBreadcrumbsByParent(nextContainer, breadcrumb);

        // finally deconste breadcrumb
        breadcrumbList.splice(breadcrumbIndex, 1);
    }

    private _handleBreadcrumbForUrl(shortUrl: string, fullUrl: string, cleanEventUrl: string): void {
        const route: Route = this._findRoute(shortUrl, this._initialRoute.children);
        this._handleBreadcrumb(route, fullUrl, cleanEventUrl, shortUrl.split('/').length - 1);
    }

    private _handleBreadcrumb(route: Route, url: string, cleanEventUrl: string, urlPartsCount: number): void {
        if (route === null || route === undefined) {
            return;
        }

        // search for existing container - create new container if not existing
        let container: TerraBreadcrumbContainer = this._containers[urlPartsCount];
        if (container === null || container === undefined) {
            container = new TerraBreadcrumbContainer();
            this._containers.push(container);
        }

        // search for existing breadcrumb
        let breadcrumb: TerraBreadcrumb = container.breadcrumbList.find((bc: TerraBreadcrumb) => {
            return bc.routerLink === url;
        });

        // breadcrumb not found
        if (breadcrumb === null || breadcrumb === undefined) {
            const activatedSnapshot: ActivatedRouteSnapshot = this._findActivatedRouteSnapshot(
                this._router.routerState.snapshot.root
            );
            const label: string = this._getBreadcrumbLabel(route, activatedSnapshot);
            const currentContainerIndex: number = this._containers.indexOf(container);
            const previousContainer: TerraBreadcrumbContainer = this._containers[currentContainerIndex - 1];
            const parentBreadcrumb: TerraBreadcrumb =
                previousContainer === null || previousContainer === undefined
                    ? undefined
                    : previousContainer.currentSelectedBreadcrumb;

            if (UrlHelper.getCleanUrl(cleanEventUrl) === UrlHelper.getCleanUrl(url)) {
                breadcrumb = new TerraBreadcrumb(label, parentBreadcrumb, url, activatedSnapshot.queryParams);
            } else {
                breadcrumb = new TerraBreadcrumb(label, parentBreadcrumb, url);
            }

            breadcrumb.hasRouteData = !isNullOrUndefined(route.data);

            container.breadcrumbList.push(breadcrumb);
        }

        // set container hidden if data is not available
        container.isHidden = container.breadcrumbList.every((bc: TerraBreadcrumb) => !bc.hasRouteData);

        // select breadcrumb and update visibilities
        container.currentSelectedBreadcrumb = breadcrumb;
        this._updateBreadcrumbVisibilities(container, breadcrumb.parent);
    }

    private _getBreadcrumbLabel(route: Route, activatedSnapshot: ActivatedRouteSnapshot): string {
        let label: string = '';
        if (!isNullOrUndefined(route.data)) {
            if (typeof route.data.label === 'function') {
                label = route.data.label(
                    this._translation,
                    activatedSnapshot.params,
                    activatedSnapshot.data,
                    activatedSnapshot.queryParams
                );
            } else {
                label = this._translation.translate(route.data.label);
            }
        }
        return label;
    }

    private _updateBreadcrumbVisibilities(
        breadcrumbContainer: TerraBreadcrumbContainer,
        parentBreadcrumb: TerraBreadcrumb
    ): void {
        breadcrumbContainer.breadcrumbList.forEach((bc: TerraBreadcrumb) => {
            bc.isHidden = bc.parent !== parentBreadcrumb || (!isNullOrUndefined(bc.parent) && bc.parent.isHidden);
        });

        // is the current selected breadcrumb now hidden?
        if (breadcrumbContainer.currentSelectedBreadcrumb.isHidden) {
            // search for another breadcrumb to be selected that is not hidden
            const foundBreadcrumb: TerraBreadcrumb = breadcrumbContainer.breadcrumbList.find(
                (bc: TerraBreadcrumb) => !bc.isHidden
            );
            if (!isNullOrUndefined(foundBreadcrumb)) {
                breadcrumbContainer.currentSelectedBreadcrumb = foundBreadcrumb;
            }
        }
    }

    // same exists in TerraRouterHelper
    private _findActivatedRouteSnapshot(activatedRouteSnapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
        if (!isNullOrUndefined(activatedRouteSnapshot.firstChild)) {
            return this._findActivatedRouteSnapshot(activatedRouteSnapshot.firstChild);
        }

        return activatedRouteSnapshot;
    }

    private _findRoute(url: string, routeConfig: Routes): Route {
        const urlParts: Array<string> = UrlHelper.removeLeadingSlash(url).split('/');
        let urlPart: string = urlParts.shift();

        let routes: Routes = routeConfig;
        let route: Route = routeConfig.find((routeToFind: Route) => {
            return routeToFind.path === urlPart;
        });

        while (!isNullOrUndefined(route) && urlParts.length > 0) {
            if (!isNullOrUndefined(route.children)) {
                routes = route.children;
                urlPart = urlParts.shift();
            } else {
                urlPart = `${urlPart} / ${urlParts.shift()}`;
            }

            route = routes.find((routeToFind: Route) => {
                const splittedRoutePath: Array<string> = routeToFind.path.split('/');

                const parameterisedRoutes: { [key: string]: number } = {};

                const splittedFlatPath: Array<string> = urlPart.split('/');

                splittedRoutePath.forEach((path: string, index: number) => {
                    if (path.startsWith(':')) {
                        parameterisedRoutes[path] = index;
                    }
                });

                Object.values(parameterisedRoutes).forEach((index: number) => {
                    splittedRoutePath[index] = splittedFlatPath[index];
                });

                const gluedRoutePath: string = splittedRoutePath.join('/');

                return !StringHelper.isNullUndefinedOrEmpty(routeToFind.path) && urlPart === gluedRoutePath;
            });
        }

        return route;
    }

    private _findBreadcrumbContainerByUrl(url: string): TerraBreadcrumbContainer {
        const urlPartsCount: number = url.split('/').length - 1;

        const container: TerraBreadcrumbContainer = this._containers[urlPartsCount];

        if (isNullOrUndefined(container)) {
            console.error('No existing breadcrumb container found.');
        }

        return container;
    }

    private _findBreadcrumbByUrl(url: string): TerraBreadcrumb {
        const container: TerraBreadcrumbContainer = this._findBreadcrumbContainerByUrl(url);

        const routerLink: string = this._initialPath + url;

        if (
            !isNullOrUndefined(container) &&
            !isNullOrUndefined(container.currentSelectedBreadcrumb) &&
            container.currentSelectedBreadcrumb.routerLink === routerLink
        ) {
            return container.currentSelectedBreadcrumb;
        } else {
            return container.breadcrumbList.find((bc: TerraBreadcrumb) => {
                return bc.routerLink === routerLink;
            });
        }
    }

    private _removeBreadcrumbContainer(breadcrumbContainer: TerraBreadcrumbContainer): void {
        const index: number = this._containers.indexOf(breadcrumbContainer);

        if (index >= 0) {
            // deconste current breadcrumb container
            this._containers.splice(index, 1);

            // get next breadcrumb container with the same index
            const nextContainer: TerraBreadcrumbContainer = this._containers[index];

            // if no more next container, select previous container and route to breadcrumb
            if (isNullOrUndefined(nextContainer)) {
                const previousContainer: TerraBreadcrumbContainer = this._containers[index - 1];

                if (
                    !isNullOrUndefined(previousContainer) &&
                    !isNullOrUndefined(previousContainer.currentSelectedBreadcrumb)
                ) {
                    this._router.navigateByUrl(previousContainer.currentSelectedBreadcrumb.routerLink);
                }
            } else {
                this._removeBreadcrumbContainer(nextContainer);
            }
        }
    }

    private _removeBreadcrumbsByParent(container: TerraBreadcrumbContainer, parent: TerraBreadcrumb): void {
        if (isNullOrUndefined(container)) {
            return;
        }

        const currentContainerIndex: number = this._containers.indexOf(container);
        const nextContainer: TerraBreadcrumbContainer = this._containers[currentContainerIndex + 1];
        const filteredBreadcrumbList: Array<TerraBreadcrumb> = container.breadcrumbList.filter(
            (bc: TerraBreadcrumb) => {
                if (bc.parent === parent && !isNullOrUndefined(nextContainer)) {
                    this._removeBreadcrumbsByParent(nextContainer, bc);
                }

                return bc.parent !== parent;
            }
        );

        if (filteredBreadcrumbList.length === 0) {
            // remove container
            this._containers.splice(currentContainerIndex, 1);
        } else {
            // update breadcrumb list
            container.breadcrumbList = filteredBreadcrumbList;
        }
    }
}
