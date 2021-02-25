import { Route, Routes } from '@angular/router';
import { RouteDataList, RouteData } from '../data/route-data-types';
import { RouteDataInterface } from '../data/route-data.interface';
import { normalizeRoutePath } from './route-path';
import { getChildren } from './route-children';

/**
 * Extracts the data of all given #routes (including children) into a flat key-value object.
 * @param routes
 */
export function extractRouteDataFromRouterConfig<T extends RouteDataInterface>(routes: Routes): RouteDataList<T> {
    const routeData: RouteDataList<T> = [];
    routes?.forEach((route: Route) => {
        if (!route?.data) {
            return; // skip routes without data
        }
        const normalizedRoutePath: string = normalizeRoutePath(route.path);

        const routeInfo: RouteData<T> = {
            path: normalizedRoutePath,
            data: route.data as T,
            ...(route.path === '' && { redirectTo: route.redirectTo }) // set redirectTo only if path is empty
        };
        const children: Routes = getChildren(route);
        const nestedRouteData: RouteDataList<T> = children ? extractRouteDataFromRouterConfig(children) : [];
        routeData.push(
            routeInfo,
            ...nestedRouteData.map((childData: RouteData<T>) => {
                return {
                    ...childData,
                    path: normalizedRoutePath + '/' + childData.path // override with the composed path
                };
            })
        );
    });

    return routeData;
}
