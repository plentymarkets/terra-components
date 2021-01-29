import { RouteDataRegistry } from './route-data-registry';
import { RouteData } from './route-data-types';
import { RouteDataInterface } from './route-data.interface';

// tslint:disable-next-line:max-function-line-count
describe('RouteDataRegistry', () => {
    afterEach(() => RouteDataRegistry['registry'].clear());

    describe('::getAll()', () => {
        it('should get the complete registry of the RouteDataRegistry', () => {
            RouteDataRegistry.registerOne('test/choom/foo/bar', { label: '' });
            let routeData: { [path: string]: Readonly<RouteDataInterface> } = RouteDataRegistry.getAll();
            expect(routeData['test/choom/foo/bar']).toEqual({ label: '' });
        });

        it('should check if the nested objects of the returned objects are readonly', () => {
            RouteDataRegistry.registerOne('test/choom/foo/bar', { label: '' });
            let mapObject: { [path: string]: Readonly<RouteDataInterface> } = RouteDataRegistry.getAll();
            expect(Object.isFrozen(mapObject['test/choom/foo/bar'])).toBeTrue();
        });
    });

    describe('::register()', () => {
        it('should ignore the basePath if it is `null` or `undefined`', () => {
            const routeDataA: RouteDataInterface = {} as RouteDataInterface;
            const routeDataB: RouteDataInterface = {} as RouteDataInterface;
            RouteDataRegistry.register(null, { a: routeDataA });
            RouteDataRegistry.register(undefined, { b: routeDataB });

            expect(Array.from(RouteDataRegistry['registry'].keys())).toContain('a', 'b');
        });

        it(`should add the given set of route data to the registry`, () => {
            const routePath: string = 'my-path';
            const routeData: RouteDataInterface = { label: 'my Label' };
            const routeDataMap: RouteData = { [routePath]: routeData };
            RouteDataRegistry.register('', routeDataMap);

            expect(RouteDataRegistry.get(routePath)).toBe(routeData);
        });

        it(`should prepend the given basePath to each key of the given set of route data`, () => {
            const basePath: string = 'basePath';
            const routeData: RouteData = {
                child1: {} as RouteDataInterface,
                child2: {} as RouteDataInterface
            };
            RouteDataRegistry.register(basePath, routeData);

            const entries: Array<[string, RouteDataInterface]> = Array.from(RouteDataRegistry['registry'].entries());
            expect(entries.every(([path]: [string, RouteDataInterface]) => path.startsWith(basePath))).toBe(true);
        });

        it(`should remove leading/trailing slashes from the given path`, () => {
            const basePathWithoutSlashes: string = 'slashes';
            const basePath: string = '/' + basePathWithoutSlashes + '/';
            const routePath: string = 'any-path';
            const routeData: RouteDataInterface = { label: 'label' };
            RouteDataRegistry.register(basePath, { [routePath]: routeData });

            const expectedPath: string = [basePathWithoutSlashes, routePath].join('/');
            expect(RouteDataRegistry['registry'].has(expectedPath)).toBe(true);
        });

        it('should be able to handle leading/trailing slashes in the keys of the given set of route data', () => {
            const routePathWithoutSlashes: string = 'slashes';
            const routePath: string = '/' + routePathWithoutSlashes + '/';
            const basePath: string = 'any-path';
            const routeData: RouteDataInterface = { label: 'label' };
            RouteDataRegistry.register(basePath, { [routePath]: routeData });

            const expectedPath: string = [basePath, routePathWithoutSlashes].join('/');
            expect(RouteDataRegistry['registry'].has(expectedPath)).toBe(true);
        });

        it(`should freeze each route data to prevent subsequent modifications`, () => {
            const routeData: RouteData = {
                foo: {} as RouteDataInterface,
                bar: {} as RouteDataInterface
            };
            RouteDataRegistry.register('', routeData);

            const values: Array<RouteDataInterface> = Array.from(RouteDataRegistry['registry'].values());
            expect(values.every((value: RouteDataInterface) => Object.isFrozen(value))).toBe(true);
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
