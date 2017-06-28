import { ModuleWithProviders } from '@angular/core';
/**
 * @author pweyrich
 */
export class TerraSplitViewInterface
{
    parent?: TerraSplitViewInterface;
    children?: Array<TerraSplitViewInterface>;
    module:ModuleWithProviders;
    instanceKey?:any;
    defaultWidth:string;
    hidden:boolean;
    name:string;
    mainComponentName:string;
    parameter:any;
}