import { ModuleWithProviders } from '@angular/core';

/**
 * @deprecated Will be removed in the next major release.
 */
export interface TerraMultiSplitViewRouteDataInterface
{
    module:ModuleWithProviders;
    name:Function | string;
    defaultWidth:string;
    focusedWidth?:string;
    mainComponentName:string;
    isBackgroundColorGrey?:boolean;
}
