import { ModuleWithProviders } from '@angular/core';
import { TerraMultiSplitViewInputInterface } from './terra-multi-split-view-input.interface';
/**
 * @author pweyrich
 */
export class TerraMultiSplitViewInterface
{
    parent?:TerraMultiSplitViewInterface;
    children?:Array<TerraMultiSplitViewInterface>;
    module:ModuleWithProviders;
    instanceKey?:any; // TODO: REMOVE!.. We don't need this anymore
    defaultWidth:string;
    focusedWidth?:string;
    hidden?:boolean; // TODO: REMOVE!.. We don't need this
    name:string;
    mainComponentName:string;
    inputs?:Array<TerraMultiSplitViewInputInterface>;
}