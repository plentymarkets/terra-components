import { Inject, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { RouteDataInterface } from './route-data.interface';
import { ROUTE_DATA, RouteDataList } from './route-data-types';
import { RouteDataRegistry } from './route-data-registry';
import { Router } from '@angular/router';
import { extractRouteDataFromRouterConfig } from '../utils';
import { TerraKeyValueInterface } from '../../models';

/**
 * Provides services to centrally manage extra data (such as a label) concerning routes of the app.
 * Should be used in conjunction with the {@link TerraBreadcrumbsComponent}.
 *
 * @see {@link RouteDataRegistry} for further information
 * @experimental
 */
@NgModule()
export class RouteDataModule<T extends RouteDataInterface = RouteDataInterface> {
    constructor(
        registry: RouteDataRegistry<T>,
        router: Router,
        @Inject(ROUTE_DATA) routeData: TerraKeyValueInterface<RouteDataList<T>>
    ) {
        // extract the data of all routes in the router config and add it to the registry
        registry.register('', extractRouteDataFromRouterConfig(router.config));
        // add all pre-extracted route data to the registry
        Object.entries(routeData).forEach(([basePath, data]: [string, RouteDataList<T>]) => {
            registry.register(basePath, data);
        });
    }

    /**
     * Creates and configures a module with all necessary providers to centrally manage extra data (such as a label) concerning routes of the app.
     * @see RouteDataModule
     * @param routeData - A set of data for certain (ideally all) routes in the app
     * @param registryProvider - Optional custom provider(s) for the `RouteDataRegistry`
     * @returns the `RouteDataModule` with providers for `RouteDataRegistry` and `ROUTE_DATA`
     */
    public static forRoot<T extends RouteDataInterface>(
        routeData: TerraKeyValueInterface<RouteDataList<T>>,
        registryProvider: Array<Provider> = [RouteDataRegistry]
    ): ModuleWithProviders<RouteDataModule<T>> {
        return {
            ngModule: RouteDataModule,
            providers: [registryProvider, { provide: ROUTE_DATA, useValue: routeData }]
        };
    }
}
