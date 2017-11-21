export interface TerraNodeInterface
{
    name?:string;
    icon?:string;
    children?:Array<TerraNodeInterface>;
    parent?:TerraNodeInterface;
    isVisible?:boolean;
    isActive?:boolean;
    isOpen?:boolean;
}