import { Route, Routes } from '@angular/router';

/**
 * This function returns the children of a given route wether they are lazy loaded or not
 * @param route The route to which the children or the lazy loaded children should be returned
 */
export function getChildren(route: Route): Routes {
    return route.children || route['_loadedConfig']?.routes;
}
