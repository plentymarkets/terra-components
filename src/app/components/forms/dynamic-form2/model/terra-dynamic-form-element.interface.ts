export interface TerraDynamicFormElementInterface
{
    type:string;
    isList?:boolean | string;
    visible?:boolean | string;
    defaultValue?:any;
    options?:{ [key:string]:any };
    children?:{ [key:string]:TerraDynamicFormElementInterface };
}
