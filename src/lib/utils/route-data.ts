import { L10nTranslationService } from 'angular-l10n';
import { Data, Params, Route, Routes } from '@angular/router';

/** Type of method that returns a label based on the activated route's params, data and queryParams.
 * angular-l10n's L10nTranslationService can be used to provide multi-lingual labels */
export type LabelFunction = (
    translation: L10nTranslationService,
    params: Params,
    routeData: Data,
    queryParams: Params
) => string;

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
