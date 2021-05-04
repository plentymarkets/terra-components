import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';
import { TerraSelectBoxValueInterface } from '../../../select-box/data/terra-select-box.interface';

export interface MultiSelectInterface extends TerraFormComponentBaseInterface {
    // NOTE: We'll continue to use `TerraSelectBoxValueInterface` internally here after it has been removed from the public API
    listBoxValues: Array<TerraSelectBoxValueInterface>;
}
