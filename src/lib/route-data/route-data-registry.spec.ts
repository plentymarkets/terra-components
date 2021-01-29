import { RouteDataRegistry } from './route-data-registry';
import { RouteDataInterface } from './route-data.interface';

fdescribe('RouteDataRegistry', () => {
    describe('::getAll()', () => {
        RouteDataRegistry.registerOne('test/choom/foo/bar', { label: '' });

        it('should get the complete registry of the RouteDataRegistry', () => {
            let routeData: { [path: string]: Readonly<RouteDataInterface> } = RouteDataRegistry.getAll();
            expect(routeData['test/choom/foo/bar']).toEqual({ label: '' });
        });

        // TODO: Activate this test once register method is merged
        xit('should check if the nested objects of the returned objects are readonly', () => {
            let mapObject: { [path: string]: Readonly<RouteDataInterface> } = RouteDataRegistry.getAll();
            expect(Object.isFrozen(mapObject['test/choom/foo/bar'])).toBeTrue();
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
