import { ModuleWithProviders } from '@angular/core';
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
    parameter:any;
}