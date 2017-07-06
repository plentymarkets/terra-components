import { TerraDynamicLoadedComponent } from './terra-dynamic-loaded-component.interface';
import { Input } from '@angular/core';
import { TerraMultiSplitViewInterface } from '../../split-view/multi/data/terra-multi-split-view.interface';
export class TerraSplitViewComponentInterface extends TerraDynamicLoadedComponent
{
    @Input() public splitViewInstance:TerraMultiSplitViewInterface;
}