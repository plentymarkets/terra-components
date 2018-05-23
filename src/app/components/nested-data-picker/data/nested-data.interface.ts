/**
 * @author chirila-ioan-danie;l
 */
export interface NestedDataInterface
{
    id:string;
    key:string;
    label:string;
    isSelected:boolean;
    parentData:string;
    dataType:string;
    dataValueMapKey:string;
    children?:Array<NestedDataInterface>;
}
