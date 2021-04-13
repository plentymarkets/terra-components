import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';
import { TerraSelectBoxValueInterface } from '../../../select-box/data/terra-select-box.interface';

export interface SelectInterface extends TerraFormComponentBaseInterface {
    listBoxValues: Array<TerraSelectBoxValueInterface>; // TODO: Maybe use an inline interface instead?
}
