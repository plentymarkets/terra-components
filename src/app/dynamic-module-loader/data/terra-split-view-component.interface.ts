import { TerraDynamicLoadedComponent } from './terra-dynamic-loaded-component.interface';
import { TerraMultiSplitViewInterface } from '../../split-view/multi/data/terra-multi-split-view.interface';

/**
 * @author pweyrich
 */

// TODO (@pweyrich): Remove extension if deprecated interface property 'parameter' is removed
export class TerraSplitViewComponentInterface extends TerraDynamicLoadedComponent
{
    public splitViewInstance:TerraMultiSplitViewInterface;
}