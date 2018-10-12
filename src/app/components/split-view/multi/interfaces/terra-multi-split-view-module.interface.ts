import { TerraMultiSplitViewInterface } from './terra-multi-split-view.interface';

/**
 * @deprecated Will be removed in the next major release.
 */
export interface TerraMultiSplitViewModuleInterface
{
    lastSelectedView?:TerraMultiSplitViewInterface;
    views:Array<TerraMultiSplitViewInterface>;
    identifier:any;
    width:string;
    currentSelectedView:TerraMultiSplitViewInterface;
}
