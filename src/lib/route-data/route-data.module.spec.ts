import { RouteDataRegistry } from './route-data-registry';
import { Route, Routes } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTE_DATA, RouteDataModule } from './route-data.module';
import { RouteData } from './route-data-types';
import { RouteDataInterface } from './route-data.interface';
import { TerraKeyValueInterface } from '../models';
import { ValueProvider } from '@angular/core';

describe('RouteDataModule:', () => {
    let registry: RouteDataRegistry<RouteDataInterface>;

    const routes: Routes = [
        { path: '1', data: {}, children: [] },
        { path: '2', data: {}, children: [] }
    ];

    const routeData: TerraKeyValueInterface<RouteData<RouteDataInterface>> = {
        prefix: {
            foo: { label: 'foo' },
            bar: { label: 'bar' }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), RouteDataModule.forRoot(routeData)]
        });

        registry = TestBed.inject(RouteDataRegistry);
    });

    it('should provide an instance of the `RouteDataRegistry`', () => {
        expect(RouteDataRegistry).toBeTruthy();
    });

    it('should provide the pre-extracted route data via the `ROUTE_DATA` injection token', () => {
        const data: TerraKeyValueInterface<RouteData<RouteDataInterface>> = TestBed.inject(ROUTE_DATA);
        expect(data).toBe(routeData);
    });

    it('should extract the route data of all routes in the router config and add it to the registry', () => {
        const listOfRouteData: Array<RouteDataInterface> = Object.values(registry.getAll());
        routes.forEach((route: Route) => {
            expect(listOfRouteData).toContain(route.data as RouteDataInterface);
        });
    });

    it('should add all pre-extracted route data to the registry', () => {
        const routeDataEntries: Array<[string, RouteDataInterface]> = Object.entries(registry.getAll());
        Object.entries(routeData).forEach(([basePath, data]: [string, RouteData<RouteDataInterface>]) => {
            Object.entries(data).forEach(([routePath, singleRouteData]: [string, RouteDataInterface]) => {
                expect(routeDataEntries).toContain([basePath + '/' + routePath, singleRouteData]);
            });
        });
    });
});
