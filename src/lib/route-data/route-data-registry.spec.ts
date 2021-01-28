import { RouteDataRegistry } from './route-data-registry';
import { RouteData } from './route-data-types';

describe('RouteDataRegistry:', () => {
    RouteDataRegistry.register('test/choom/foo/bar', {});

    it('should get the complete registry of the RouteDataRegistry', () => {
        const testObject: RouteData = {
            'test/choom/foo/bar': { label: '' }
        };

        expect(RouteDataRegistry.getAll()).toBe(testObject);
    });

    it('should check if the returned object is readonly', () => {
        let mapObject: RouteData = RouteDataRegistry.getAll();
        expect(Object.isFrozen(mapObject)).toBeTrue();
    });
});
