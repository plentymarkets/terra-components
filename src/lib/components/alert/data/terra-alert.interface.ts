import { AlertType } from '../alert-type.enum';

export interface TerraAlertInterface
{
    msg:string;
    type:AlertType;
    dismissOnTimeout:number;
    identifier?:string;
}
