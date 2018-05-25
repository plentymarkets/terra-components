/**
 * @author chirila-ioan-daniel
 */
export interface NestedDataInterface
{
    label:string;
    key:string;
    isSelected:boolean;
    children?:Array<NestedDataInterface>;
}
