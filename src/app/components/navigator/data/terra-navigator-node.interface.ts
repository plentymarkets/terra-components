import { TerraBaseData } from '../../data/terra-base.data';

/**
 * @author mscharf
 * @deprecated since `terra-navigator` is now deprecated
 */
export interface TerraNavigatorNodeInterface<D> extends TerraBaseData
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
