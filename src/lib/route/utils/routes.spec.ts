import { extractRouteDataFromRouterConfig } from './routes';
import { Routes } from '@angular/router';
import { RouteDataInterface } from '../data/route-data.interface';

describe('extractRouteDataFromRouteConfig', () => {
    it(`should return an empty object if the router's config is null, undefined or an empty array`, () => {
        expect(extractRouteDataFromRouterConfig(null)).toEqual([]);
        expect(extractRouteDataFromRouterConfig(undefined)).toEqual([]);
        expect(extractRouteDataFromRouterConfig([])).toEqual([]);
    });

    it('should not throw an error if a given route is null or undefined', () => {
        expect(extractRouteDataFromRouterConfig([null, undefined])).toEqual([]);
    });

    it(`should NOT include a route's path and data if it has no data attached`, () => {
        expect(extractRouteDataFromRouterConfig([{ path: 'test' }])).toEqual([]);
    });

    it(`should include a route's path and data if it has data attached`, () => {
        const routeData: RouteDataInterface = { label: 'test' };
        expect(extractRouteDataFromRouterConfig([{ path: 'test', data: routeData }])).toEqual([
            { path: 'test', data: routeData }
        ]);
    });

    it(`should include the data of a route's children`, () => {
        const routeData: RouteDataInterface = { label: 'foo' };
        const childRouteData: RouteDataInterface = { label: 'bar' };
        const routerConfig: Routes = [
            {
                path: 'foo',
                data: routeData,
                children: [{ path: 'bar', data: childRouteData }]
            }
        ];
        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual([
            { path: 'foo', data: routeData },
            { path: 'foo/bar', data: childRouteData }
        ]);
    });

    it(`should be able to handle both, nested and flat routes with data`, () => {
        const nestedData: RouteDataInterface = { label: 'nested' };
        const nestedChildData: RouteDataInterface = { label: 'nested-child' };
        const flatData: RouteDataInterface = { label: 'flat' };
        const flatChildData: RouteDataInterface = { label: 'flat-child' };
        const routerConfig: Routes = [
            { path: 'nested', data: nestedData, children: [{ path: 'child', data: nestedChildData }] },
            { path: 'flat', data: flatData },
            { path: 'flat/child', data: flatChildData }
        ];

        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual([
            { path: 'nested', data: nestedData },
            { path: 'nested/child', data: nestedChildData },
            { path: 'flat', data: flatData },
            { path: 'flat/child', data: flatChildData }
        ]);
    });

    it(`should be able to handle route paths with a leading or a trailing slash`, () => {
        const data: RouteDataInterface = { label: 'my Label' };
        const routerConfig: Routes = [
            { path: '/test', data: data },
            { path: '/foo/bar/', data: data },
            {
                path: 'nested/',
                data: data,
                children: [
                    { path: 'child1', data: data },
                    { path: '/child2', data: data },
                    { path: '/child3/', data: data }
                ]
            }
        ];
        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual([
            { path: 'test', data: data },
            { path: 'foo/bar', data: data },
            { path: 'nested', data: data },
            { path: 'nested/child1', data: data },
            { path: 'nested/child2', data: data },
            { path: 'nested/child3', data: data }
        ]);
    });

    it('should attach the `emptyPath` flag to the data of routes with empty paths', () => {
        const emptyPathRouteData: RouteDataInterface = { label: 'empty path route' };
        const usualRouteData: RouteDataInterface = { label: 'foo' };
        const routes: Routes = [
            { path: '', redirectTo: 'foo', data: emptyPathRouteData },
            { path: 'foo', data: usualRouteData }
        ];

        expect(extractRouteDataFromRouterConfig(routes)).toEqual([
            { path: '', data: emptyPathRouteData, emptyPath: true },
            { path: 'foo', data: usualRouteData }
        ]);
    });
});
