import { TerraMultiSplitViewInterface } from '../interfaces/terra-multi-split-view.interface';

/**
 * @author pweyrich
 */
export interface TerraMultiSplitViewDetail
{
    lastSelectedView?:TerraMultiSplitViewInterface;
    views:Array<TerraMultiSplitViewInterface>;
    identifier:any;
    width:string;
    currentSelectedView:TerraMultiSplitViewInterface;
}
