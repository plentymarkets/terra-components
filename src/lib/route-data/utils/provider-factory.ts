import { RouteDataInterface } from '../route-data.interface';
import { Provider } from '@angular/core';
import { RouteDataRegistry } from '../route-data-registry';
import { RouteDataRegistryInitializer } from '../route-data-registry-initializer';

export function createRouteDataRegistryProviders<T extends RouteDataInterface>(
    routeDataRegistry: RouteDataRegistry<T>
): Array<Provider> {
    return [
        {
            provide: RouteDataRegistry,
            useValue: routeDataRegistry
        },
        RouteDataRegistryInitializer
    ];
}
