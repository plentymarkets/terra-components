import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';
import { TerraMultiCheckBoxValueInterface } from '../../../multi-check-box/data/terra-multi-check-box-value.interface';

export interface MultiSelectInterface extends TerraFormComponentBaseInterface {
    // NOTE: We'll continue to use `TerraMultiCheckBoxValueInterface` internally here after it has been removed from the public API
    listBoxValues: Array<TerraMultiCheckBoxValueInterface>;
}
