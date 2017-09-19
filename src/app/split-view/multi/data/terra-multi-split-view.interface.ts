import { ModuleWithProviders } from '@angular/core';
import { TerraDynamicLoadedComponentInputInterface } from '../../../dynamic-module-loader/data/terra-dynamic-loaded-component-input.interface';

/**
 * @author pweyrich
 */
export class TerraMultiSplitViewInterface
{
    parent?:TerraMultiSplitViewInterface;
    children?:Array<TerraMultiSplitViewInterface>;
    module:ModuleWithProviders;
    defaultWidth:string;
    focusedWidth?:string;
    name:string;
    mainComponentName:string;
    /**
     * @deprecated Will be removed in an upcoming release.
     */
    parameter?:any;
    inputs?:Array<TerraDynamicLoadedComponentInputInterface>;
}
