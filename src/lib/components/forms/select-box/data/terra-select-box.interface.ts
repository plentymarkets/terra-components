import { AllowedColors } from './allowed.colors.enum';

export interface TerraSelectBoxValueInterface
{
    value:any;
    caption:string | number;
    icon?:string;
    position?:number;
    color?:AllowedColors;
}
