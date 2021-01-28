import { RouteDataRegistry } from './route-data.registry';
import { RouteData, RouteDataInterface } from '../utils/route-data';

describe('RouteDataRegistry:', () => {
    RouteDataRegistry.register('test/choom/foo/bar', {});

    it('should get the complete registry of the RouteDataRegistry', () => {
        const testObject: RouteData = {
            'test/choom/foo/bar': {}
        };

        expect(RouteDataRegistry.getAll()).toBe(testObject);
    });

    it('should check if the returned object is readonly', () => {
        let mapObject: RouteData = RouteDataRegistry.getAll();
        expect((mapObject['test/choom/foo/bar'] = { label: 'Test' })).toThrow(new Error(''));
    });
});
