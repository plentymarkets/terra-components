import { TerraDynamicLoadedComponent } from './terra-dynamic-loaded-component.interface';
import { TerraMultiSplitViewInterface } from '../../split-view/multi/data/terra-multi-split-view.interface';

/**
 * @author pweyrich
 */

export class TerraSplitViewComponentInterface extends TerraDynamicLoadedComponent
{
    public splitViewInstance:TerraMultiSplitViewInterface;
}