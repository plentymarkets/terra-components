/**
 * @author chirila-ioan-danie;l
 */
export interface NestedDataInterface
{
    label:string;
    key:string;
    isSelected:boolean;
    children?:Array<NestedDataInterface>;
}
