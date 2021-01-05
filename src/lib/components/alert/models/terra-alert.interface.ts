import { AlertType } from './alert-type';

export interface TerraAlertInterface {
    msg: string;
    type: AlertType;
    dismissOnTimeout: number;
    identifier?: string;
}
