/**
 * @author mkunze
 */
export interface TerraLeafInterface
{
    caption:string;
    isOpen?:boolean;
    icon?:string;
    id?:number;
    isActive?:boolean;
    contextMenu?:Array<any>;//TODO
    subLeafList?:Array<TerraLeafInterface>;
    parentLeafList?:Array<TerraLeafInterface>;
    value?:any; //for checkbox-tree
    checkboxChecked?:boolean; //for checkbox-tree
}
