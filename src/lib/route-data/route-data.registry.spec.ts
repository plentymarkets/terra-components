import { RouteDataRegistry } from './route-data.registry';

describe('RouteDataRegistry:', () => {
    RouteDataRegistry.register('test/choom/foo/bar', {});

    it('should get the complete registry of the RouteDataRegistry', () => {
        expect(RouteDataRegistry.getAll()).toBe(new Map([['test/choom/foo/bar', {}]]));
    });
});
