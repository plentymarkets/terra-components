export interface TerraNodeInterface<D>
{
    id:string|number;
    name:string;
    icon?:string;
    children?:Array<TerraNodeInterface<D>>;
    parent?:TerraNodeInterface<D>;
    isVisible?:boolean;
    isActive?:boolean;
    isOpen?:boolean;
    value?:D;
}