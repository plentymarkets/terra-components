/**
 * @author mscharf
 */
export interface TerraNavigatorNodeInterface
{
    id?:number;
    parentNodeIndex?:number;
    nodeName:string;
    //parent:Array<TerraNavigatorNodeInterface>;
    children:Array<TerraNavigatorNodeInterface>;
}
