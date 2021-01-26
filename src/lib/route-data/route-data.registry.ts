import { TCRouteDataInterface } from './route-data.interface';
import { Router, Routes } from '@angular/router';

function extractRouteDataFromRouterConfig(routerConfig: Routes): TCRouteDataInterface {
    // TODO
    return null;
}

export class TCRouteDataRegistry {
    private static registry: Map<string, TCRouteDataInterface> = new Map();

    constructor(router: Router) {
        // TODO
        TCRouteDataRegistry.register('', extractRouteDataFromRouterConfig([]));
    }

    public static registerOne(path: string, data: TCRouteDataInterface): void {
        // TODO
    }

    public static register(path: string, data: TCRouteDataInterface): void {
        // TODO
    }

    public static getAll(): Readonly<TCRouteDataInterface> {
        // TODO
        return null;
    }

    public get(path: string): TCRouteDataInterface {
        // TODO
        return null;
    }

    public static get(path: string): TCRouteDataInterface {
        // TODO
        return null;
    }
}
