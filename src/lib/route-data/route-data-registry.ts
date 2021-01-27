import { RouteDataInterface } from './route-data.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { extractRouteDataFromRouterConfig } from '../utils/route-data';
import { RouteData } from './route-data-function-types';

@Injectable({
    providedIn: 'root'
})
export class RouteDataRegistry {
    private static registry: Map<string, RouteDataInterface> = new Map();

    constructor(router: Router) {
        // TODO
        RouteDataRegistry.register('', extractRouteDataFromRouterConfig(router.config));
    }

    public static registerOne(path: string, data: RouteDataInterface): void {
        // TODO
    }

    public static register(path: string, data: RouteData): void {
        // TODO
    }

    public static getAll(): Readonly<RouteData> {
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
