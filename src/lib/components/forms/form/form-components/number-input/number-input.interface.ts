import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';

export interface NumberInputInterface extends TerraFormComponentBaseInterface {
    maxLength: number;
    maxValue: number;
    minLength: number;
    minValue: number;
}
