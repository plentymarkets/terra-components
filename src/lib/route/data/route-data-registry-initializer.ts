import { Injectable } from '@angular/core';
import { RouteDataInterface } from './route-data.interface';
import { Router } from '@angular/router';
import { extractRouteDataFromRouterConfig } from '../utils';
import { RouteDataRegistry } from './route-data-registry';

/**
 * A class that initializes the RouteDataRegistry with the data attached to the configured routes of the router.
 */
@Injectable()
export class RouteDataRegistryInitializer<T extends RouteDataInterface> {
    constructor(router: Router, routeDataRegistry: RouteDataRegistry<T>) {
        routeDataRegistry.register('', extractRouteDataFromRouterConfig(router.config));
    }
}
