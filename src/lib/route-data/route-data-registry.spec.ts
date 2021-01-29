import { RouteDataRegistry } from './route-data-registry';
import { RouteData } from './route-data-types';
import { RouteDataInterface } from './route-data.interface';

fdescribe('RouteDataRegistry', () => {
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

    describe('::getAll()', () => {
        RouteDataRegistry.registerOne('test/choom/foo/bar', { label: '' });

        it('should get the complete registry of the RouteDataRegistry', () => {
            const testObject: RouteData = {
                'test/choom/foo/bar': { label: '' }
            };

            expect(RouteDataRegistry.getAll()).toEqual(testObject);
        });

        it('should check if the returned object is readonly', () => {
            let mapObject: RouteData = RouteDataRegistry.getAll();
            expect(Object.isFrozen(mapObject)).toBeTrue();
        });

        it('should check if the nested objects of the returned objects are readonly', () => {
            let mapObject: RouteData = RouteDataRegistry.getAll();
            expect(Object.isFrozen(mapObject['test/choom/foo/bar'])).toBeTrue();
        });
    });
});
