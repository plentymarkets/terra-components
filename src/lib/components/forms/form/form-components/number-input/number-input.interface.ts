import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';

export interface NumberInputInterface extends TerraFormComponentBaseInterface {
    minValue: number;
    maxValue: number;
}
