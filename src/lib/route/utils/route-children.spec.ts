import { Route } from '@angular/router';
import { getChildren } from './route-children';

describe('getChild-function', () => {
    it('should return the children to a route', () => {
        const route: Route = {
            path: 'foo',
            children: [{ path: 'bar', data: { label: 'bar' } }]
        };
        expect(getChildren(route)).toBe(route.children);
    });

    it('should return undefined with empty children', () => {
        const route: Route = {
            path: 'foo'
        };

        expect(getChildren(route)).toBeUndefined();
    });

    it('should return lazy-loaded routes', () => {
        const route: Route = {
            path: 'foo'
        };

        route['_loadedConfig'] = { routes: [{ path: 'bar', data: { label: 'bar' } }] };

        expect(getChildren(route)).toBe(route['_loadedConfig'].routes);
    });

    it('should return undefined if no route is given', () => {
        expect(getChildren(undefined)).toBeUndefined();
    });
});
