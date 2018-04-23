import { ModuleWithProviders } from '@angular/core';
import { TerraDynamicLoadedComponentInputInterface } from '../../../dynamic-module-loader/data/terra-dynamic-loaded-component-input.interface';

/**
 * @author pweyrich
 */
export class TerraMultiSplitViewInterface
{
    public parent?:TerraMultiSplitViewInterface;
    public children?:Array<TerraMultiSplitViewInterface>;
    public module:ModuleWithProviders;
    public defaultWidth:string;
    public focusedWidth?:string;
    public name:string;
    public mainComponentName:string;

    /**
     * @deprecated Will be removed in an upcoming release.
     */
    public parameter?:any;
    public inputs?:Array<TerraDynamicLoadedComponentInputInterface>;
}
