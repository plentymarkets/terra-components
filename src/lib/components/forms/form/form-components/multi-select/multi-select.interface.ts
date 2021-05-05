import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';

export interface MultiSelectInterface extends TerraFormComponentBaseInterface {
    checkboxValues: Array<{ caption: string; value: any }>;
}
