import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';

export interface TextAreaInterface extends TerraFormComponentBaseInterface {
    hasFixedHeight: boolean;
    maxRows: number;
    maxLength: number;
}
