/**
 * @author chirila-ioan-danie;l
 */
export interface NestedDataInterface<T>
{
    label:string;
    key:string;
    isSelected:boolean;
    children?:Array<NestedDataInterface<T>>;
}
