import { Route, Routes } from '@angular/router';
import { RouteDataInfo } from '../data/route-data-types';
import { RouteDataInterface } from '../data/route-data.interface';
import { normalizeRoutePath } from './route-path';
import { getChildren } from './route-children';

/**
 * Extracts the data of all given #routes (including children) into a flat key-value object.
 * @param routes
 */
export function extractRouteDataFromRouterConfig<T extends RouteDataInterface>(
    routes: Routes
): Array<RouteDataInfo<T>> {
    const routeData: Array<RouteDataInfo<T>> = [];
    routes?.forEach((route: Route) => {
        if (!route?.data) {
            return; // skip routes without data
        }
        const normalizedRoutePath: string = normalizeRoutePath(route.path);

        const routeInfo: RouteDataInfo<T> = {
            path: normalizedRoutePath,
            data: route.data as T,
            ...(!!route.redirectTo && { redirectTo: route.redirectTo }) // set redirectTo only if redirectTo is set in the route
        };
        const children: Routes = getChildren(route);
        const nestedRouteData: Array<RouteDataInfo<T>> = children ? extractRouteDataFromRouterConfig(children) : [];
        routeData.push(
            routeInfo,
            ...nestedRouteData.map((childData: RouteDataInfo<T>) => {
                return {
                    ...childData,
                    path: normalizedRoutePath + '/' + childData.path
                };
            })
        );
    });

    return routeData;
}
