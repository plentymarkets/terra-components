import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraMultiCheckBoxValueInterface } from '../../multi-check-box/data/terra-multi-check-box-value.interface';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldMultiCheckBoxOptions extends TerraFormFieldBaseOptions<any> {
  checkBoxValues?: Array<TerraMultiCheckBoxValueInterface>;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldMultiCheckBox extends TerraFormFieldBase<any> {
  public checkBoxValues: Array<TerraMultiCheckBoxValueInterface>;

  constructor(
    key: string,
    label: string,
    required: boolean,
    options: TerraFormFieldMultiCheckBoxOptions = {}
  ) {
    super(key, TerraControlTypeEnum.MULTI_CHECK_BOX, label, required, options);

    this.defaultValue = options['checkBoxValues'] || [];
  }
}
