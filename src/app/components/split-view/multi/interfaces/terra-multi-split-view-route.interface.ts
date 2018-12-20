import { TerraMultiSplitViewRouteDataInterface } from './terra-multi-split-view-route-data.interface';
import { Route } from '@angular/router';
import { TerraMultiSplitViewRoutes } from './terra-multi-split-view-routes';

/**
 * @deprecated Will be removed in the next major release.
 */
export interface TerraMultiSplitViewRouteInterface extends Route
{
    data?:TerraMultiSplitViewRouteDataInterface;
    children?:TerraMultiSplitViewRoutes;
}
