import { Route, Routes } from '@angular/router';

export function getChildren(route: Route): Routes {
    return route.children || route['_loadedConfig']?.routes;
}
