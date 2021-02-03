import { Route, Routes } from '@angular/router';
import { RouteData } from '../route-data-types';
import { RouteDataInterface } from '../route-data.interface';
import { normalizeRoutePath } from './route-path';

export const redirectedRoutePrefix: string = 'redirect:';
/**
 * Extracts the data of all given #routes (including children) into a flat key-value object.
 * @param routes
 */
export function extractRouteDataFromRouterConfig<T extends RouteDataInterface>(routes: Routes): RouteData<T> {
    const routeData: RouteData<T> = {};
    routes?.forEach((route: Route) => {
        if (!route?.data) {
            return; // skip routes without data
        }
        const normalizedRoutePath: string = normalizeRoutePath(route.path);
        routeData[normalizedRoutePath] = route.data as T;
        const nestedRouteData: RouteData<T> = route.children ? extractRouteDataFromRouterConfig(route.children) : {};
        Object.entries(nestedRouteData).forEach(([key, value]: [string, T]) => {
            // TODO(pweyrich): this may have to be adjusted.. not sure if it works like that..
            const routePath: string = (key === '' ? redirectedRoutePrefix : '') + normalizedRoutePath + '/' + key;
            routeData[routePath] = value;
        });
    });

    return routeData;
}
