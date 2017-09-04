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
    defaultWidth:string;
    focusedWidth?:string;
    name:string;
    mainComponentName:string;
    inputs?:Array<TerraMultiSplitViewInputInterface>;
}