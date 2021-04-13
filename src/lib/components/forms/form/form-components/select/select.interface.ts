import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';
import { TerraSelectBoxValueInterface } from '../../../select-box/data/terra-select-box.interface';

export interface SelectInterface extends TerraFormComponentBaseInterface {
    isSmall?: boolean; // TODO: Do we still need to support this?
    openOnTop?: boolean; // TODO: Do we still need to support this? Material handles this automatically
    listBoxValues: Array<TerraSelectBoxValueInterface>; // TODO: Maybe use an inline interface instead?
}
