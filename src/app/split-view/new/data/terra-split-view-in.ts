import { ModuleWithProviders } from '@angular/core';
/**
 * @author mfrank
 */
export interface TerraSplitViewIn
{
    module:ModuleWithProviders;
    instanceKey?:any;
    defaultWidth:string;
    hidden?:boolean;
    name:string;
    mainComponentName:string;
    parameter:any;
    nextViews?:Array<TerraSplitViewIn>;
    parentView?:TerraSplitViewIn;
    isSelected?:boolean; //For breadcrumb selection
}
