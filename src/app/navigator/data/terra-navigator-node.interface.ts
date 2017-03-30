/**
 * @author mscharf
 */
export interface TerraNavigatorNodeInterface
{
    nodeName:string;
    value?:any;
    rootPath?:Array<number>;
    children:Array<TerraNavigatorNodeInterface>;
}
