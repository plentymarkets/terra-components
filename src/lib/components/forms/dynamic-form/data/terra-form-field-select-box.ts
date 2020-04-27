import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldSelectBoxOptions extends TerraFormFieldBaseOptions<any> {
  selectBoxValues?: Array<TerraSelectBoxValueInterface>;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldSelectBox extends TerraFormFieldBase<any> {
  public selectBoxValues: Array<TerraSelectBoxValueInterface>;

  constructor(
    key: string,
    label: string,
    required: boolean,
    options: TerraFormFieldSelectBoxOptions = {}
  ) {
    super(key, TerraControlTypeEnum.SELECT_BOX, label, required, options);

    this.selectBoxValues = options['selectBoxValues'] || [];
  }
}
