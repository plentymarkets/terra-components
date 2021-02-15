import { Route, Routes } from '@angular/router';
import { RouteData } from '../data/route-data-types';
import { RouteDataInterface } from '../data/route-data.interface';
import { normalizeRoutePath } from './route-path';

/**
 * Extracts the data of all given #routes (including children) into a flat key-value object.
 * @param routes
 */
export function extractRouteDataFromRouterConfig<T extends RouteDataInterface>(
    routes: Routes
): RouteData<T & { redirected?: boolean }> {
    const routeData: RouteData<T & { redirected?: boolean }> = {};
    routes?.forEach((route: Route) => {
        if (!route?.data) {
            return; // skip routes without data
        }
        const normalizedRoutePath: string = normalizeRoutePath(route.path);
        routeData[normalizedRoutePath] =
            route.redirectTo && route.path === ''
                ? Object.assign(route.data as T, { redirected: true })
                : (route.data as T);
        const nestedRouteData: RouteData<T> = route.children ? extractRouteDataFromRouterConfig(route.children) : {};
        Object.entries(nestedRouteData).forEach(([key, value]: [string, T]) => {
            routeData[normalizedRoutePath + '/' + key] = value;
        });
    });

    return routeData;
}
