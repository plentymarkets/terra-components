import { TerraSplitViewInterface } from './terra-split-view.interface';
/**
 * @author pweyrich
 */
export interface TerraSplitViewDetail
{
    views:Array<TerraSplitViewInterface>;
    identifier:any;
    defaultWidth:string;
    currentSelectedView:TerraSplitViewInterface;
}
