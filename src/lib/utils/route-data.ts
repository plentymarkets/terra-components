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

export function extractRouteDataFromRouterConfig(routerConfig: Routes): RouteData {
    const routeData: RouteData = {};
    routerConfig?.forEach((route: Route) => {
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

export function normalizeRoutePath(routePath: string): string {
    const withoutLeadingSlash: string = routePath.startsWith('/') ? routePath.substring(1) : routePath;
    return withoutLeadingSlash.endsWith('/')
        ? withoutLeadingSlash.substring(0, withoutLeadingSlash.length - 1)
        : withoutLeadingSlash;
}
