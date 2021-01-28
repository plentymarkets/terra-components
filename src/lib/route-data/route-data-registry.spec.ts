import { RouteDataRegistry } from './route-data-registry';
import { RouteData } from './route-data-types';
import { RouteDataInterface } from './route-data.interface';

describe('RouteDataRegistry', () => {
    describe('::register()', () => {
        it(`should add the given route data to the registry`, () => {
            pending();
        });

        it(`should prepend the given path to each key of the given route data object`, () => {
            const basePath: string = 'basePath';
            const routeData: RouteData = { 'child-path': { label: 'child' } };
            RouteDataRegistry.register('basePath', routeData);

            const entries: Array<[string, RouteDataInterface]> = Array.from(RouteDataRegistry['registry'].entries());
            expect(entries.every(([path]: [string, RouteDataInterface]) => path.startsWith(basePath))).toBe(true);
        });

        it(`should be able to handle leading/trailing slashes in the given path`, () => {
            pending();
        });

        it('should be able to handle leading/trailing slashes in the keys of the given route data object', () => {
            pending();
        });

        it(`should not register data for an 'invalid' route path`, () => {
            pending();
        });
    });

    describe('::get()', () => {
        it('should return `undefined` if there is no data for a given route path', () => {
            expect(RouteDataRegistry.get('pathThatDoesNotExists')).toBeUndefined();
        });

        it('should return the data for a given route path when available', () => {
            const path: string = 'anyPath';
            const data: RouteDataInterface = { label: 'my Label' };
            RouteDataRegistry.registerOne(path, data);
            expect(RouteDataRegistry.get(path)).toBe(data);
        });

        it('should be able to handle leading/trailing slashes in the given path', () => {
            const path: string = 'anyPath';
            const data: RouteDataInterface = { label: 'my Label' };
            RouteDataRegistry.registerOne(path, data);
            expect(RouteDataRegistry.get('/' + path)).toBe(data);
            expect(RouteDataRegistry.get(path + '/')).toBe(data);
        });

        it('should be able to get the data for a route path with parameters when given a matching url', () => {
            const path: string = 'my/path/with/:param';
            const data: RouteDataInterface = { label: 'my label' };
            RouteDataRegistry.registerOne(path, data);
            expect(RouteDataRegistry.get('my/path/with/2')).toBe(data);
            expect(RouteDataRegistry.get('my/path/with/a-param')).toBe(data);
        });
    });
});
