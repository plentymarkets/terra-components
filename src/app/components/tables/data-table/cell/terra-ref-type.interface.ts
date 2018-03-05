export enum TerraRefTypeEnum
{
    email = 'mailto',
    phone = 'tel',
    function = 'function'
}

export interface TerraRefTypeInterface
{
    type:TerraRefTypeEnum;
    value:string | TerraRefTypeInterface['func'];
    caption?:string | number;
    func?:() => void;
}
