import { ModuleWithProviders } from '@angular/core';
/**
 * @author pweyrich
 */
export class TerraSplitViewInterface
{
    parent?: TerraSplitViewInterface;
    children?: Array<TerraSplitViewInterface>;
    module:ModuleWithProviders;
    instanceKey?:any; // TODO: REMOVE!.. We don't need this anymore
    defaultWidth:string;
    hidden:boolean; // TODO: REMOVE!.. We don't need this
    name:string;
    mainComponentName:string;
    parameter:any;
}