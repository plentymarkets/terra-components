import { RouteDataInterface } from './route-data.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { extractRouteDataFromRouterConfig } from '../utils/route-data';
import { RouteData } from './route-data-types';

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
        let object: RouteData = ({ ...this.registry } as unknown) as RouteData;

        Object.freeze(object);

        Object.getOwnPropertyNames(object).forEach((property: string) => {
            if (
                object[property] !== null &&
                (typeof object[property] === 'object' || typeof object[property] === 'function') &&
                !Object.isFrozen(object[property])
            ) {
                Object.freeze(object[property]);
            }
        });

        return object;
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
