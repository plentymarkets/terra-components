import { L10nTranslationService } from 'angular-l10n';
import { Data, Params } from '@angular/router';
import { RouteDataInterface } from './route-data.interface';
import { InjectionToken } from '@angular/core';
import { TerraKeyValueInterface } from '../../models';

/** Type of method that returns a label based on the activated route's params, data and queryParams.
 * angular-l10n's L10nTranslationService can be used to provide multi-lingual labels */
export type LabelFunction = (
    translation: L10nTranslationService,
    params: Params,
    routeData: Data,
    queryParams: Params
) => string;

/** Specifies a single set of information to register data for a certain route. */
export interface RouteDataInfo<T extends RouteDataInterface> {
    path: string;
    data: T;
    redirectTo?: string;
}

/** Specifies a list of data related to certain routes. */
export type RouteData<T extends RouteDataInterface> = Array<RouteDataInfo<T>>;

/** Specifies a set of immutable data related to certain routes. */
export type ReadonlyRouteData<T extends RouteDataInterface> = { [path: string]: Readonly<T> };

/** Injection token for the pre-extracted data of routes in the app. */
export const ROUTE_DATA: InjectionToken<TerraKeyValueInterface<RouteData<RouteDataInterface>>> = new InjectionToken(
    'route data'
);
