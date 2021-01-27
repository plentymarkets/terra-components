import { RouteDataInterface } from './route-data.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { extractRouteDataFromRouterConfig, RouteData } from '../utils/route-data';

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

    public static getAll(): Readonly<Map<string, RouteDataInterface>> {
        return this.registry;
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
