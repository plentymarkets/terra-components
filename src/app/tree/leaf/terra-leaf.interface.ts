/**
 * @author mkunze
 */
export interface TerraLeafInterface
{
    caption:string;
    isOpen?:boolean;
    avoidOpenOnClick?:boolean;
    icon?:string;
    iconColor?:string;
    id?:number;
    isActive?:boolean;
    clickFunction?:() => void;
    contextMenu?:Array<any>;//TODO
    subLeafList?:Array<TerraLeafInterface>;
    parentLeafList?:Array<TerraLeafInterface>;
    value?:any; //for checkbox-tree
    checkboxChecked?:boolean; //for checkbox-tree
}
