/**
 * @author mkunze
 */
export interface PlentyLeaf
{
    caption:string;
    isOpen?:boolean;
    icon?:string;
    id?:number;
    isActive?:boolean;
    contextMenu?:Array<any>;//TODO
    subLeafList?:Array<PlentyLeaf>;
    parentLeafList?:Array<PlentyLeaf>;
    value?:any; //for checkbox-tree
    checkboxChecked?:boolean; //for checkbox-tree
}
