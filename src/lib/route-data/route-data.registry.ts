import { RouteDataInterface } from './route-data.interface';
import { Router, Routes } from '@angular/router';

function extractRouteDataFromRouterConfig(routerConfig: Routes): RouteDataInterface {
    // TODO
    return null;
}

export class RouteDataRegistry {
    private static registry: Map<string, RouteDataInterface> = new Map();

    constructor(router: Router) {
        // TODO
        RouteDataRegistry.register('', extractRouteDataFromRouterConfig([]));
    }

    public static registerOne(path: string, data: RouteDataInterface): void {
        // TODO
    }

    public static register(path: string, data: RouteDataInterface): void {
        // TODO
    }

    public static getAll(): Readonly<RouteDataInterface> {
        // TODO
        return null;
    }

    public get(path: string): RouteDataInterface {
        // TODO
        return null;
    }

    public static get(path: string): RouteDataInterface {
        // TODO
        return null;
    }
}
