import { LabelFunction } from '../route-data-function-types';
import { Route, Routes } from '@angular/router';
import { normalizeRoutePath } from './route-path';

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
