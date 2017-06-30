import { TerraSplitViewInterface } from './terra-split-view.interface';
/**
 * @author pweyrich
 */
export interface TerraSplitViewDetail
{
    lastSelectedView?:TerraSplitViewInterface;
    views:Array<TerraSplitViewInterface>;
    identifier:any;
    defaultWidth:string;
    currentSelectedView:TerraSplitViewInterface;
}
