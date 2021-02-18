import { RouteDataInterface } from './route-data.interface';
import { Injectable } from '@angular/core';
import { ReadonlyRouteData, RouteDataInfo } from './route-data-types';
import { UrlHelper } from '../../helpers';
import { findMatchingRoutePath, normalizeRoutePath } from '../utils';

/** Manages extra data (such as a label) concerning routes of the app. */
@Injectable()
export class RouteDataRegistry<T extends RouteDataInterface> {
    private registry: Map<string, Readonly<T>> = new Map();
    private redirectedRegistry: Map<string, Readonly<T>> = new Map();

    // TODO: What do we do with this method??
    /**
     * Adds a single set of route data to the registry.
     * It will freeze the data to prevent subsequent modifications.
     * @param path The path of the route. It shouldn't be prefixed with a slash
     * @param data The corresponding data of the route
     * @param redirected Whether the data belongs to a redirect route
     */
    public registerOne(path: string, data: T, redirected?: boolean): void {
        // TODO(pweyrich): we may run tests against the path.. it may not include spaces or any other special characters
        // TODO(pweyrich): we may need to "deep freeze" it, since values might be objects as well
        // {link} https://www.30secondsofcode.org/blog/s/javascript-deep-freeze-object
        const registry: Map<string, T> = this.getRegistry(redirected);
        registry.set(normalizeRoutePath(path), Object.freeze(data)); // freeze the data to prevent modifications
    }

    /**
     * Adds a set of route data to the registry.
     * Each route data object will be frozen to prevent subsequent modifications.
     * If any route data needs to be modified afterwards, just re-register it!
     * @param basePath The basepath of the routes to be added. The last part of the path is stored in the key attribute in the data object
     * @param routeData The data of the corresponding routes
     */
    public register(basePath: string, routeData: Array<RouteDataInfo<T>>): void {
        routeData.forEach(({ path, data, redirectTo }: RouteDataInfo<T>) => {
            const normalizedBasePath: string = normalizeRoutePath(basePath);
            const normalizedRoutePath: string = normalizeRoutePath(path);
            const completePath: string = normalizedBasePath
                ? normalizedBasePath + '/' + normalizedRoutePath
                : normalizedRoutePath;
            const redirected: boolean = redirectTo !== null && redirectTo !== undefined;
            this.registerOne(completePath, data, redirected);
        });
    }

    /**
     * Returns the complete map of all the route paths with their corresponding data.
     * @param redirected Whether to return the data of only redirected routes
     */
    public getAll(redirected?: boolean): ReadonlyRouteData<T> {
        const registry: Map<string, T> = this.getRegistry(redirected);
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
     * @param redirected Whether to return the data of a usual or redirected route with equivalent path
     */
    public get(url: string, redirected?: boolean): T | undefined {
        // TODO: handle trailing slashes in another way
        const cleanUrl: string = normalizeRoutePath(UrlHelper.getCleanUrl(url));

        // determine the relevant registry
        const registry: Map<string, T> = this.getRegistry(redirected);

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
     * @param redirected Whether to return the registry for data of usual or redirected routes
     */
    private getRegistry(redirected: boolean): Map<string, T> {
        return redirected ? this.redirectedRegistry : this.registry;
    }
}
