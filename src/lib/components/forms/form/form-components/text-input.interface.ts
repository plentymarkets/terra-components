import { TerraFormComponentBaseInterface } from './terra-form-component-base.interface';

export interface TextInputInterface extends TerraFormComponentBaseInterface {
    isPassword: boolean;
    isIban: boolean;
    isReadonly: boolean;
    minLength: number;
    maxLength: number;
}
