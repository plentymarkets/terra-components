import { ModuleWithProviders } from '@angular/core';

export interface TerraMultiSplitViewRouteDataInterface
{
    module:ModuleWithProviders;
    name:Function | string;
    defaultWidth:string;
    focusedWidth?:string;
    mainComponentName:string;
    isBackgroundColorGrey?:boolean;
}
