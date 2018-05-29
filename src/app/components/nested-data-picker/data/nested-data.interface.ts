/**
 * @author chirila-ioan-daniel
 */
export interface NestedDataInterface<T>
{
    label?:string;
    key?:string;
    isSelected?:boolean;
    children?:Array<NestedDataInterface<T>>;
    data?:T;
}
