import { RouteDataInterface } from './route-data.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouteData } from './route-data-types';
import { UrlHelper } from '../helpers';
import { compareSegments, extractRouteDataFromRouterConfig, normalizeRoutePath } from './utils';

@Injectable({
    providedIn: 'root'
})
export class RouteDataRegistry {
    private static registry: Map<string, Readonly<RouteDataInterface>> = new Map();

    constructor(router: Router) {
        // TODO
        RouteDataRegistry.register('', extractRouteDataFromRouterConfig(router.config));
    }

    // TODO: What do we do with this method??
    public static registerOne(path: string, data: RouteDataInterface): void {
        // TODO(pweyrich): we may run tests against the path.. it may not include spaces or any other special characters
        this.registry.set(path, data);
    }

    /**
     * Adds a set of route data to the registry.
     * Each route data object will be frozen to prevent subsequent modifications.
     * If any route data needs to be modified afterwards, just re-register it!
     * @param basePath
     * @param data
     */
    public static register(basePath: string, data: RouteData): void {
        // TODO(pweyrich): we may run tests against the path.. it may not include spaces or any other special characters
        Object.entries(data).forEach(([routePath, value]: [string, RouteDataInterface]) => {
            const normalizedBasePath: string = normalizeRoutePath(basePath);
            const normalizedRoutePath: string = normalizeRoutePath(routePath);
            const completePath: string = normalizedBasePath
                ? normalizedBasePath + '/' + normalizedRoutePath
                : normalizedRoutePath;
            // TODO(pweyrich): we may need to "deep freeze" it, since values might be objects as well
            // {link} https://www.30secondsofcode.org/blog/s/javascript-deep-freeze-object
            this.registry.set(completePath, Object.freeze(value)); // freeze the data to prevent modifications
        });
    }

    public static getAll(): { [path: string]: Readonly<RouteDataInterface> } {
        const routeData: RouteData = Array.from(this.registry.entries()).reduce(
            (accumulator: {}, [key, value]: [string, RouteDataInterface]) => ({
                ...accumulator,
                [key]: value
            }),
            {}
        );

        return routeData;
    }

    public get(path: string): RouteDataInterface | undefined {
        return RouteDataRegistry.get(path);
    }

    /**
     * Returns the stored data for a given #url.
     * @param url The url that the data needs to be found to
     */
    public static get(url: string): RouteDataInterface | undefined {
        // TODO: handle trailing slashes in another way
        const cleanUrl: string = normalizeRoutePath(UrlHelper.getCleanUrl(url));

        // check if the data can be found by simply looking for the route in the registry.
        // if not the url may match any route path with parameters
        if (this.registry.has(cleanUrl)) {
            return this.registry.get(cleanUrl);
        }

        // split the url into its segments
        const urlSegments: Array<string> = cleanUrl.split('/');

        // get all potentially matching route paths - those must include parameters AND have the same amount of segments as the given url
        const potentiallyMatchingRoutePaths: Array<string> = Array.from(this.registry.keys()).filter(
            (routePath: string) => {
                return routePath.includes(':') && routePath.split('/').length === urlSegments.length;
            }
        );

        // scan through all potential matches to check if one of it really matches the given url
        const matchingRoutePath: string = potentiallyMatchingRoutePaths.find((routePath: string) => {
            // split the current route path into its segments
            const routePathSegments: Array<string> = routePath.split('/');

            // compare the segments of the route path with those of the url. do they match?
            return compareSegments(routePathSegments, urlSegments);
        });

        // down here we've either found a matching route path or we were unable to find any match
        return matchingRoutePath ? this.registry.get(matchingRoutePath) : undefined;
    }
}
