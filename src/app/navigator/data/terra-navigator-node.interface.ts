/**
 * @author mscharf
 */
export interface TerraNavigatorNodeInterface<D>
{
    nodeName:string;
    nodeIcon?:string;
    route:string;
    value?:D;
    rootPath?:Array<number>;
    children?:Array<TerraNavigatorNodeInterface<D>>;
    isVisible?:boolean;
    isActive?:boolean;
    isButtonClicked?:boolean;
}
