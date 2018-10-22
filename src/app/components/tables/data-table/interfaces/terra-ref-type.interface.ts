import { TerraRefTypeEnum } from '../enums/terra-ref-type.enum';

export interface TerraRefTypeInterface
{
    type:TerraRefTypeEnum;
    value:string | number | Function;
    caption?:any;
    target?:string;
}
