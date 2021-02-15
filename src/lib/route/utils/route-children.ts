import { Route, Routes } from '@angular/router';

/**
 * This function returns the children of a given route regardless they are eagerly or lazy loaded.
 * @param route The route to which the children or the lazy loaded children should be returned
 */
export function getChildren(route: Route): Routes | undefined {
    return route.children || route['_loadedConfig']?.routes;
}
