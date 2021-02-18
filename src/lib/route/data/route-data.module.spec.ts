import { RouteDataRegistry } from './route-data-registry';
import { Route, Routes } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteDataModule } from './route-data.module';
import { ROUTE_DATA, RouteDataList, RouteData } from './route-data-types';
import { RouteDataInterface } from './route-data.interface';
import { ClassProvider, ExistingProvider, Injectable, ValueProvider } from '@angular/core';
import { TerraKeyValueInterface } from '../../models';

describe('RouteDataModule:', () => {
    let registry: RouteDataRegistry<RouteDataInterface>;

    const routes: Routes = [
        { path: '1', data: {}, children: [] },
        { path: '2', data: {}, children: [] }
    ];

    const routeData: TerraKeyValueInterface<RouteDataList<RouteDataInterface>> = {
        prefix: [
            { path: 'foo', data: { label: 'foo' } },
            { path: 'bar', data: { label: 'bar' } }
        ]
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), RouteDataModule.forRoot(routeData)]
        });

        registry = TestBed.inject(RouteDataRegistry);
    });

    it('should provide an instance of the `RouteDataRegistry` by default', () => {
        expect(RouteDataRegistry).toBeTruthy();
    });

    it('should provide the pre-extracted route data via the `ROUTE_DATA` injection token', () => {
        const data: TerraKeyValueInterface<RouteDataList<RouteDataInterface>> = TestBed.inject(ROUTE_DATA);
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
        Object.entries(routeData).forEach(
            ([basePath, preExtractedRouteData]: [string, RouteDataList<RouteDataInterface>]) => {
                preExtractedRouteData.forEach(({ path, data }: RouteData<RouteDataInterface>) => {
                    expect(routeDataEntries).toContain([basePath + '/' + path, data]);
                });
            }
        );
    });

    describe('with a custom provider for the `RouteDataRegistry`', () => {
        // reset the configuration of the TestingModule to be able to redefine the providers
        beforeEach(() => TestBed.resetTestingModule());

        it('should use a given custom ValueProvider to provide the instance of the `RouteDataRegistry`', () => {
            const ref: RouteDataRegistry<RouteDataInterface> = new RouteDataRegistry();
            const provider: ValueProvider = { provide: RouteDataRegistry, useValue: ref };
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes(routes), RouteDataModule.forRoot(routeData, [provider])]
            });

            const injectedRef: RouteDataRegistry<RouteDataInterface> = TestBed.inject(RouteDataRegistry);
            expect(injectedRef).toBe(ref);
        });

        it('should use the given list of custom providers of the `RouteDataRegistry`', () => {
            @Injectable()
            class TestRouteDataRegistry extends RouteDataRegistry<RouteDataInterface> {}
            const classProvider: ClassProvider = { provide: TestRouteDataRegistry, useClass: TestRouteDataRegistry };
            const existingProvider: ExistingProvider = {
                provide: RouteDataRegistry,
                useExisting: TestRouteDataRegistry
            };
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes(routes),
                    RouteDataModule.forRoot(routeData, [classProvider, existingProvider])
                ]
            });

            const routeDataRegistryRef: RouteDataRegistry<RouteDataInterface> = TestBed.inject(RouteDataRegistry);
            expect(routeDataRegistryRef instanceof TestRouteDataRegistry).toBeTrue();

            const testRouteDataRegistryRef: TestRouteDataRegistry = TestBed.inject(TestRouteDataRegistry);
            expect(testRouteDataRegistryRef instanceof TestRouteDataRegistry).toBeTrue();
        });
    });
});
