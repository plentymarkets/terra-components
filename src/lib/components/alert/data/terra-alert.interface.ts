import { AlertType } from '../alert-type.enum';

export interface TerraAlertInterface {
    msg: string;
    type: string | AlertType;
    dismissOnTimeout: number;
    identifier?: string;
}
