import { extractRouteDataFromRouterConfig, RouteDataInterface } from './route-data';
import { Routes } from '@angular/router';

describe('extractRouteDataFromRouteConfig', () => {
    it(`should return an empty object if the router's config is null, undefined or an empty array`, () => {
        expect(extractRouteDataFromRouterConfig(null)).toEqual({});
        expect(extractRouteDataFromRouterConfig(undefined)).toEqual({});
        expect(extractRouteDataFromRouterConfig([])).toEqual({});
    });

    it(`should NOT include a route's path and data if it has no data attached`, () => {
        expect(extractRouteDataFromRouterConfig([{ path: 'test' }])).toEqual({});
    });

    it(`should include a route's path and data if it has data attached`, () => {
        const routeData: RouteDataInterface = { label: 'test' };
        expect(extractRouteDataFromRouterConfig([{ path: 'test', data: routeData }])).toEqual({ test: routeData });
    });

    it(`should include the data of a route's children`, () => {
        const childRouteData: RouteDataInterface = { label: 'bar' };
        const routerConfig: Routes = [
            {
                path: 'foo',
                data: {},
                children: [{ path: 'bar', data: { label: 'bar' } }]
            }
        ];
        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual({ foo: {}, 'foo/bar': childRouteData });
    });

    it(`should be able to handle both, nested and flat routes with data`, () => {
        const nestedChildData: RouteDataInterface = { label: 'nested-child' };
        const flatChildData: RouteDataInterface = { label: 'flat-child' };
        const routerConfig: Routes = [
            { path: 'nested', data: {}, children: [{ path: 'child', data: nestedChildData }] },
            { path: 'flat', data: {} },
            { path: 'flat/child', data: flatChildData }
        ];

        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual({
            nested: {},
            'nested/child': nestedChildData,
            flat: {},
            'flat/child': flatChildData
        });
    });

    it(`should be able to handle route paths with a leading or a trailing slash`, () => {
        const routerConfig: Routes = [
            { path: '/test', data: {} },
            { path: '/foo/bar/', data: {} },
            {
                path: 'nested/',
                data: {},
                children: [
                    { path: 'child1', data: {} },
                    { path: '/child2', data: {} },
                    { path: '/child3/', data: {} }
                ]
            }
        ];
        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual({
            test: {},
            'foo/bar': {},
            nested: {},
            'nested/child1': {},
            'nested/child2': {},
            'nested/child3': {}
        });
    });
});
