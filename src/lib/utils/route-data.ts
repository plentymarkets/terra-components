import { Route, Routes } from '@angular/router';
import { RouteDataInterface } from '../route-data/route-data.interface';
import { RouteData } from '../route-data/route-data-types';

/**
 * Extracts the data of all given #routes (including children) into a flat key-value object.
 * @param routes
 */
export function extractRouteDataFromRouterConfig(routes: Routes): RouteData {
    const routeData: RouteData = {};
    routes?.forEach((route: Route) => {
        if (!route?.data) {
            return; // skip routes without data
        }
        const normalizedRoutePath: string = normalizeRoutePath(route.path);
        routeData[normalizedRoutePath] = route.data as RouteDataInterface;
        const nestedRouteData: RouteData = route.children ? extractRouteDataFromRouterConfig(route.children) : {};
        Object.entries(nestedRouteData).forEach(([key, value]: [string, RouteDataInterface]) => {
            routeData[normalizedRoutePath + '/' + key] = value;
        });
    });

    return routeData;
}

// TODO: should it also be able to remove multiple leading/trailing slashes??
/**
 * Normalizes a route's path. Specifically removes a leading and/or trailing slash.
 * @param routePath
 */
export function normalizeRoutePath(routePath: string): string {
    const withoutLeadingSlash: string = routePath.startsWith('/') ? routePath.substring(1) : routePath;
    return withoutLeadingSlash.endsWith('/')
        ? withoutLeadingSlash.substring(0, withoutLeadingSlash.length - 1)
        : withoutLeadingSlash;
}
