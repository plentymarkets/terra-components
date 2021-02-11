import {
    ClassProvider,
    ExistingProvider,
    FactoryProvider,
    Inject,
    InjectionToken,
    ModuleWithProviders,
    NgModule,
    Provider,
    ValueProvider
} from '@angular/core';
import { RouteDataInterface } from './route-data.interface';
import { RouteData } from './route-data-types';
import { RouteDataRegistry } from './route-data-registry';
import { extractRouteDataFromRouterConfig } from './utils';
import { Router } from '@angular/router';
import { TerraKeyValueInterface } from '../models';

export const ROUTE_DATA: InjectionToken<TerraKeyValueInterface<RouteData<RouteDataInterface>>> = new InjectionToken(
    'route data'
);

@NgModule()
export class RouteDataModule<T extends RouteDataInterface> {
    constructor(
        registry: RouteDataRegistry<T>,
        router: Router,
        @Inject(ROUTE_DATA) routeData: TerraKeyValueInterface<RouteData<T>>
    ) {
        registry.register('', extractRouteDataFromRouterConfig(router.config));
        Object.entries(routeData).forEach(([basePath, data]: [string, RouteData<T>]) => {
            registry.register(basePath, data);
        });
    }

    public static forRoot<T extends RouteDataInterface>(
        routeData: TerraKeyValueInterface<RouteData<T>>,
        registryProvider?: ExistingProvider | ValueProvider | ClassProvider | FactoryProvider // optional custom provider for the RouteDataRegistry
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
