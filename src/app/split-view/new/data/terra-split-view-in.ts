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
    nextView?:TerraSplitViewIn;
    parentView?:TerraSplitViewIn;
    componentChildren?:Array<TerraSplitViewIn>;
}
