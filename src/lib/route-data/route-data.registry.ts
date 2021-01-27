import { RouteDataInterface } from './route-data.interface';
import { Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';

function extractRouteDataFromRouterConfig(routerConfig: Routes): RouteDataInterface {
    // TODO
    return null;
}

@Injectable({
    providedIn: 'root'
})
export class RouteDataRegistry {
    private static registry: Map<string, RouteDataInterface> = new Map();

    constructor(router: Router) {
        // TODO
        RouteDataRegistry.register('', extractRouteDataFromRouterConfig([]));
    }

    public static registerOne(path: string, data: RouteDataInterface): void {
        // TODO(pweyrich): we may run any tests against the path.. it may not include spaces or any other special characters
        this.registry.set(path, data);
    }

    public static register(path: string, data: RouteDataInterface): void {
        // TODO
    }

    public static getAll(): Readonly<RouteDataInterface> {
        // TODO
        return null;
    }

    public get(path: string): RouteDataInterface {
        // TODO: handle leading/trailing slashes
        // TODO: handle parameterised routes (really? or should the consumer need to pass a real route path?)
        return null;
    }

    public static get(path: string): RouteDataInterface | undefined {
        // TODO
        return null;
    }
}
