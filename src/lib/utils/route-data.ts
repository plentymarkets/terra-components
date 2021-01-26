import { L10nTranslationService } from 'angular-l10n';
import { Data, Params, Routes } from '@angular/router';

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
    return undefined;
}
