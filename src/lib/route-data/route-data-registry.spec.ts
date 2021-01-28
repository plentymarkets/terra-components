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
});
