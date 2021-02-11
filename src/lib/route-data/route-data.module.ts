import {
    ClassProvider,
    ExistingProvider,
    FactoryProvider,
    Inject,
    ModuleWithProviders,
    NgModule,
    Provider,
    ValueProvider
} from '@angular/core';
import { RouteDataInterface } from './route-data.interface';
import { ROUTE_DATA, RouteData } from './route-data-types';
import { RouteDataRegistry } from './route-data-registry';
import { extractRouteDataFromRouterConfig } from './utils';
import { Router } from '@angular/router';
import { TerraKeyValueInterface } from '../models';

@NgModule()
export class RouteDataModule<T extends RouteDataInterface> {
    constructor(
        registry: RouteDataRegistry<T>,
        router: Router,
        @Inject(ROUTE_DATA) routeData: TerraKeyValueInterface<RouteData<T>>
    ) {
        // extract the data of all routes in the router config and add it to the registry
        registry.register('', extractRouteDataFromRouterConfig(router.config));
        // add all pre-extracted route data to the registry
        Object.entries(routeData).forEach(([basePath, data]: [string, RouteData<T>]) => {
            registry.register(basePath, data);
        });
    }

    /**
     * A function that returns the RouteDataModule with providers for `RouteDataRegistry` and `ROUTE_DATA`
     * @param routeData - The pre-extracted list of route data in the app
     * @param registryProvider - Optional custom provider for the RouteDataRegistry
     */
    public static forRoot<T extends RouteDataInterface>(
        routeData: TerraKeyValueInterface<RouteData<T>>,
        registryProvider?: ExistingProvider | ValueProvider | ClassProvider | FactoryProvider
    ): ModuleWithProviders<RouteDataModule<T>> {
        const registryProviders: Array<Provider> = registryProvider
            ? [registryProvider, { provide: RouteDataRegistry, useExisting: registryProvider.provide }]
            : [{ provide: RouteDataRegistry, useClass: RouteDataRegistry }];

        return {
            ngModule: RouteDataModule,
            providers: [...registryProviders, { provide: ROUTE_DATA, useValue: routeData }]
        };
    }
}
