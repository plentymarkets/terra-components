// Route-Utils
export {
    findMatchingRoutePath,
    compareSegments,
    normalizeRoutePath,
    getChildren,
    extractRouteDataFromRouterConfig
} from './utils';

// Route-Data
export {
    RouteDataModule,
    RouteData,
    RouteDataInterface,
    RouteDataRegistry,
    LabelFunction,
    ReadonlyRouteData,
    RedirectedRoute,
    ROUTE_DATA
} from './data';
