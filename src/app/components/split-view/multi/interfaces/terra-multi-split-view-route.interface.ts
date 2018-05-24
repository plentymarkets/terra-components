import { TerraMultiSplitViewRouteDataInterface } from './terra-multi-split-view-route-data.interface';
import { Route } from '@angular/router';
import { TerraMultiSplitViewRoutes } from '../data/terra-multi-split-view-routes';

export interface TerraMultiSplitViewRouteInterface extends Route
{
    data?:TerraMultiSplitViewRouteDataInterface;
    children?:TerraMultiSplitViewRoutes;
}
