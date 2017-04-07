/**
 * @author mscharf
 */
export interface TerraNavigatorNodeInterface<D>
{
    nodeName:string;
    value?:D;
    rootPath?:Array<number>;
    children:Array<TerraNavigatorNodeInterface<D>>;
}
