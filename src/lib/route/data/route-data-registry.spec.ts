import { RouteDataRegistry } from './route-data-registry';
import { RouteDataList, RouteData } from './route-data-types';
import { RouteDataInterface } from './route-data.interface';

// tslint:disable-next-line:max-function-line-count
describe('RouteDataRegistry', () => {
    let routeDataRegistry: RouteDataRegistry<RouteDataInterface>;
    beforeEach(() => (routeDataRegistry = new RouteDataRegistry()));

    describe('::getAll()', () => {
        it('should get the complete registry of the RouteDataRegistry', () => {
            routeDataRegistry.registerOne('test/choom/foo/bar', { label: '' });
            let routeData: { [path: string]: Readonly<RouteDataInterface> } = routeDataRegistry.getAll();
            expect(routeData['test/choom/foo/bar']).toEqual({ label: '' });
        });

        it('should check if the nested objects of the returned objects are readonly', () => {
            routeDataRegistry.registerOne('test/choom/foo/bar', { label: '' });
            let mapObject: { [path: string]: Readonly<RouteDataInterface> } = routeDataRegistry.getAll();
            expect(Object.isFrozen(mapObject['test/choom/foo/bar'])).toBeTrue();
        });

        it('should only return the data of routes with empty paths if requested', () => {
            const routeData: RouteDataList<RouteDataInterface> = [
                { path: 'foo', data: {} as RouteDataInterface, emptyPath: true },
                { path: 'bar', data: {} as RouteDataInterface }
            ];
            routeDataRegistry.register('', routeData);

            expect(routeDataRegistry.getAll(true)).toEqual({ foo: {} as RouteDataInterface });
        });
    });

    describe('::register()', () => {
        it('should ignore the basePath if it is `null` or `undefined`', () => {
            const routeDataA: RouteDataInterface = {} as RouteDataInterface;
            const routeDataB: RouteDataInterface = {} as RouteDataInterface;
            routeDataRegistry.register(null, [{ path: 'a', data: routeDataA }]);
            routeDataRegistry.register(undefined, [{ path: 'b', data: routeDataB }]);

            expect(Array.from(routeDataRegistry['registry'].keys())).toContain('a', 'b');
        });

        it(`should add the given set of route data to the registry`, () => {
            const routePath: string = 'my-path';
            const routeData: RouteDataInterface = { label: 'my Label' };
            routeDataRegistry.register('', [{ path: routePath, data: routeData }]);

            expect(routeDataRegistry.get(routePath)).toBe(routeData);
        });

        it(`should prepend the given basePath to each key of the given set of route data`, () => {
            const basePath: string = 'basePath';
            const routeData: RouteDataList<RouteDataInterface> = [
                { path: 'child1', data: {} as RouteDataInterface },
                { path: 'child2', data: {} as RouteDataInterface }
            ];
            routeDataRegistry.register(basePath, routeData);

            const entries: Array<[string, RouteDataInterface]> = Array.from(routeDataRegistry['registry'].entries());
            expect(entries.every(([path]: [string, RouteDataInterface]) => path.startsWith(basePath))).toBe(true);
        });

        it(`should remove leading/trailing slashes from the given path`, () => {
            const basePathWithoutSlashes: string = 'slashes';
            const basePath: string = '/' + basePathWithoutSlashes + '/';
            const routePath: string = 'any-path';
            const routeData: RouteDataInterface = { label: 'label' };
            routeDataRegistry.register(basePath, [{ path: routePath, data: routeData }]);

            const expectedPath: string = [basePathWithoutSlashes, routePath].join('/');
            expect(routeDataRegistry['registry'].has(expectedPath)).toBe(true);
        });

        it('should be able to handle leading/trailing slashes in the keys of the given set of route data', () => {
            const routePathWithoutSlashes: string = 'slashes';
            const routePath: string = '/' + routePathWithoutSlashes + '/';
            const basePath: string = 'any-path';
            const routeData: RouteDataInterface = { label: 'label' };
            routeDataRegistry.register(basePath, [{ path: routePath, data: routeData }]);

            const expectedPath: string = [basePath, routePathWithoutSlashes].join('/');
            expect(routeDataRegistry['registry'].has(expectedPath)).toBe(true);
        });

        it(`should freeze each route data to prevent subsequent modifications`, () => {
            const routeData: RouteDataList<RouteDataInterface> = [
                { path: 'foo', data: {} as RouteDataInterface },
                { path: 'bar', data: {} as RouteDataInterface }
            ];
            routeDataRegistry.register('', routeData);

            const values: Array<RouteDataInterface> = Array.from(routeDataRegistry['registry'].values());
            expect(values.every((value: RouteDataInterface) => Object.isFrozen(value))).toBe(true);
        });

        it('should add routes with an empty path to the other map', () => {
            const routeData: RouteDataList<RouteDataInterface> = [
                { path: 'foo', data: {} as RouteDataInterface, emptyPath: true },
                { path: 'bar', data: {} as RouteDataInterface }
            ];
            routeDataRegistry.register('', routeData);

            expect(Array.from(routeDataRegistry['registry'].keys())).toEqual(['bar']);
            expect(Array.from(routeDataRegistry['emptyPathRegistry'].keys())).toEqual(['foo']);
        });

        it('should NOT store the extra `emptyPath` flag in the registry', () => {
            const routeData: RouteData<RouteDataInterface> = {
                path: 'foo',
                data: { label: 'foo' },
                emptyPath: true
            };
            routeDataRegistry.register('', [routeData]);

            expect(routeDataRegistry['emptyPathRegistry'].get('foo')).toEqual({ label: 'foo' });
        });

        it(`should not register data for an 'invalid' route path`, () => {
            pending();
        });
    });

    describe('::get()', () => {
        it('should return `undefined` if there is no data for a given route path', () => {
            expect(routeDataRegistry.get('pathThatDoesNotExists')).toBeUndefined();
        });

        it('should return the data for a given route path when available', () => {
            const path: string = 'anyPath';
            const data: RouteDataInterface = { label: 'my Label' };
            routeDataRegistry.registerOne(path, data);
            expect(routeDataRegistry.get(path)).toBe(data);
        });

        it('should be able to handle leading/trailing slashes in the given path', () => {
            const path: string = 'anyPath';
            const data: RouteDataInterface = { label: 'my Label' };
            routeDataRegistry.registerOne(path, data);
            expect(routeDataRegistry.get('/' + path)).toBe(data);
            expect(routeDataRegistry.get(path + '/')).toBe(data);
        });

        it('should be able to get the data for a route path with parameters when given a matching url', () => {
            const path: string = 'my/path/with/:param';
            const data: RouteDataInterface = { label: 'my label' };
            routeDataRegistry.registerOne(path, data);
            expect(routeDataRegistry.get('my/path/with/2')).toBe(data);
            expect(routeDataRegistry.get('my/path/with/a-param')).toBe(data);
        });

        it('should return the route originally marked with `emptyPath` instead of a usual route if requested', () => {
            const routeData: RouteDataList<RouteDataInterface> = [
                { path: 'foo', data: { label: 'foo' }, emptyPath: true },
                { path: 'foo', data: {} as RouteDataInterface }
            ];
            routeDataRegistry.register('', routeData);

            expect(routeDataRegistry.get('foo', true)).toEqual({ label: 'foo' });
            expect(routeDataRegistry.get('foo')).toEqual({} as RouteDataInterface);
        });
    });
});
