import { RouteDataRegistryInitializer } from './route-data-registry-initializer';
import { RouteDataRegistry } from './route-data-registry';
import { Route, Router, Routes } from '@angular/router';

describe('RouteDataRegistryInitializer:', () => {
    let initializer: RouteDataRegistryInitializer<any>;
    let registry: RouteDataRegistry<any>;

    const routes: Routes = [
        { path: '1', data: {} },
        { path: '2', data: {} }
    ];
    const routerStub: Partial<Router> = {
        config: routes
    };
    beforeEach(() => {
        registry = new RouteDataRegistry<any>();
        initializer = new RouteDataRegistryInitializer(routerStub as Router, registry);
    });

    it('should extract the route data of all routes in the router config and add it to the registry', () => {
        expect(Object.values(registry.getAll())).toEqual(routes.map((route: Route) => route.data));
    });
});
