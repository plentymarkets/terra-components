import { L10nTranslationService } from 'angular-l10n';
import { Data, Params } from '@angular/router';
import { RouteDataInterface } from './route-data.interface';
import { InjectionToken } from '@angular/core';
import { TerraKeyValueInterface } from '../models';

/** Type of method that returns a label based on the activated route's params, data and queryParams.
 * angular-l10n's L10nTranslationService can be used to provide multi-lingual labels */
export type LabelFunction = (
    translation: L10nTranslationService,
    params: Params,
    routeData: Data,
    queryParams: Params
) => string;

export type RedirectedRoute = { redirected?: boolean };

export type RouteData<T extends RouteDataInterface> = { [path: string]: T };

export type ReadonlyRouteData<T extends RouteDataInterface> = { [path: string]: Readonly<T> };

/** Injection token for the pre-extracted route data */
export const ROUTE_DATA: InjectionToken<TerraKeyValueInterface<RouteData<RouteDataInterface>>> = new InjectionToken(
    'route data'
);
