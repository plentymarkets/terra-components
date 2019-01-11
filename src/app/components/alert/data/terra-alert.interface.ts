import { AlertType } from '../alert.service';

export interface TerraAlertInterface
{
    msg:string;
    type:string | AlertType;
    dismissOnTimeout:number;
    identifier?:string;
}
