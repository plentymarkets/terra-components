import { LabelFunction } from '../route-data/route-data-function-types';
import { Route, Routes } from '@angular/router';

export interface RouteDataInterface {
    label?: string | LabelFunction; // TODO(pweyrich): shouldn't this be mandatory?
}

export type RouteData = { [path: string]: RouteDataInterface };

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

/**
 * Compares a list of routePath segments with a list of url segments and returns whether they are matching.
 * A routePath segment matches a url segment if they are equal or if the routePath segment is a placeholder (starts with ':').
 * @param routePathSegments
 * @param urlSegments
 */
export function compareSegments(routePathSegments: Array<string>, urlSegments: Array<string>): boolean {
    if (routePathSegments.length !== urlSegments.length) {
        return false;
    }

    return routePathSegments.every((routePathSegment: string, index: number) => {
        const urlSegment: string = urlSegments[index]; // segment of the url at the same index
        return routePathSegment === urlSegment || routePathSegment.startsWith(':');
    });
}
