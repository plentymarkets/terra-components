import { RouteDataInterface } from './route-data.interface';
import { Injectable } from '@angular/core';
import { ReadonlyRouteData, RouteDataList, RouteData } from './route-data-types';
import { UrlHelper } from '../../helpers';
import { findMatchingRoutePath, normalizeRoutePath } from '../utils';

/** Manages extra data (such as a label) concerning routes of the app. */
@Injectable()
export class RouteDataRegistry<T extends RouteDataInterface> {
    /** Registry with data of "usual" routes */
    private registry: Map<string, Readonly<T>> = new Map();
    /** Registry with data of routes with empty paths. */
    private emptyPathRegistry: Map<string, Readonly<T>> = new Map();

    // TODO: What do we do with this method??
    /**
     * Adds a single set of route data to the registry.
     * It will freeze the data to prevent subsequent modifications.
     * @param path The path of the route. It shouldn't be prefixed with a slash
     * @param data The corresponding data of the route
     * @param emptyPath Whether the data belongs to a route with an empty path
     */
    public registerOne(path: string, data: T, emptyPath?: boolean): void {
        // TODO(pweyrich): we may run tests against the path.. it may not include spaces or any other special characters
        // TODO(pweyrich): we may need to "deep freeze" it, since values might be objects as well
        // {link} https://www.30secondsofcode.org/blog/s/javascript-deep-freeze-object
        const registry: Map<string, T> = this.getRegistry(emptyPath);
        registry.set(normalizeRoutePath(path), Object.freeze(data)); // freeze the data to prevent modifications
    }

    /**
     * Adds a set of route data to the registry.
     * Each route data object will be frozen to prevent subsequent modifications.
     * If any route data needs to be modified afterwards, just re-register it!
     * @param basePath The basepath of the routes to be added. The last part of the path is stored in the key attribute in the data object
     * @param routeData The data of the corresponding routes
     */
    public register(basePath: string, routeData: RouteDataList<T>): void {
        routeData.forEach(({ path, data, emptyPath }: RouteData<T>) => {
            const normalizedBasePath: string = normalizeRoutePath(basePath);
            const normalizedRoutePath: string = normalizeRoutePath(path);
            const completePath: string = normalizedBasePath
                ? normalizedBasePath + '/' + normalizedRoutePath
                : normalizedRoutePath;
            this.registerOne(completePath, data, emptyPath);
        });
    }

    /**
     * Returns the complete map of all the route paths with their corresponding data.
     * @param emptyPath Whether to only return the data of routes with an empty path
     */
    public getAll(emptyPath?: boolean): ReadonlyRouteData<T> {
        const registry: Map<string, T> = this.getRegistry(emptyPath);
        return Array.from(registry.entries()).reduce(
            (accumulator: {}, [key, value]: [string, RouteDataInterface]) => ({
                ...accumulator,
                [key]: value
            }),
            {}
        );
    }

    /**
     * Returns the stored data for a given #url.
     * @param url The url that the data needs to be found to
     * @param emptyPath Whether to return the data of a route with an empty path but the equivalent url
     */
    public get(url: string, emptyPath?: boolean): T | undefined {
        // TODO: handle trailing slashes in another way
        const cleanUrl: string = normalizeRoutePath(UrlHelper.getCleanUrl(url));

        // determine the relevant registry
        const registry: Map<string, T> = this.getRegistry(emptyPath);

        // check if the data can be found by simply looking for the route in the registry.
        // if not the url may match any route path with parameters
        if (registry.has(cleanUrl)) {
            return registry.get(cleanUrl);
        }

        // find a matching route path for the given url
        const matchingRoutePath: string | undefined = findMatchingRoutePath(cleanUrl, Array.from(registry.keys()));

        // we've now either found a matching route path or we were unable to find any match
        return matchingRoutePath ? registry.get(matchingRoutePath) : undefined;
    }

    /**
     * Determines the relevant registry.
     * @param emptyPath Whether to return the registry for data of routes with empty paths
     */
    private getRegistry(emptyPath: boolean): Map<string, T> {
        return emptyPath ? this.emptyPathRegistry : this.registry;
    }
}
