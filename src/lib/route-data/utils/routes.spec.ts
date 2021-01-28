import { extractRouteDataFromRouterConfig } from './routes';
import { Routes } from '@angular/router';
import { RouteDataInterface } from '../route-data.interface';

describe('extractRouteDataFromRouteConfig', () => {
    it(`should return an empty object if the router's config is null, undefined or an empty array`, () => {
        expect(extractRouteDataFromRouterConfig(null)).toEqual({});
        expect(extractRouteDataFromRouterConfig(undefined)).toEqual({});
        expect(extractRouteDataFromRouterConfig([])).toEqual({});
    });

    it('should not throw an error if a given route is null or undefined', () => {
        expect(extractRouteDataFromRouterConfig([null, undefined])).toEqual({});
    });

    it(`should NOT include a route's path and data if it has no data attached`, () => {
        expect(extractRouteDataFromRouterConfig([{ path: 'test' }])).toEqual({});
    });

    it(`should include a route's path and data if it has data attached`, () => {
        const routeData: RouteDataInterface = { label: 'test' };
        expect(extractRouteDataFromRouterConfig([{ path: 'test', data: routeData }])).toEqual({ test: routeData });
    });

    it(`should include the data of a route's children`, () => {
        const routeData: RouteDataInterface = { label: 'foo' };
        const childRouteData: RouteDataInterface = { label: 'bar' };
        const routerConfig: Routes = [
            {
                path: 'foo',
                data: routeData,
                children: [{ path: 'bar', data: { label: 'bar' } }]
            }
        ];
        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual({ foo: routeData, 'foo/bar': childRouteData });
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

        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual({
            nested: nestedData,
            'nested/child': nestedChildData,
            flat: flatData,
            'flat/child': flatChildData
        });
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
        expect(extractRouteDataFromRouterConfig(routerConfig)).toEqual({
            test: data,
            'foo/bar': data,
            nested: data,
            'nested/child1': data,
            'nested/child2': data,
            'nested/child3': data
        });
    });
});
