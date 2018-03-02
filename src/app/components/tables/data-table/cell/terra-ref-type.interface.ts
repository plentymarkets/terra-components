export enum TerraRefTypeEnum
{
    email = 'mailto',
    phone = 'tel',
    function = 'function'
}

export interface TerraRefTypeInterface
{
    type:TerraRefTypeEnum;
    value:string | number | TerraRefTypeInterface['func'];
    caption?:string | number;
    func?:Function;
}
