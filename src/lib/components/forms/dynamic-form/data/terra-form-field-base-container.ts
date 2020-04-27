import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldBaseContainerOptions extends TerraFormFieldBaseOptions<string> {
  containerEntries?: Array<TerraFormFieldBase<any>>;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldBaseContainer extends TerraFormFieldBase<string> {
  public containerEntries: Array<TerraFormFieldBase<any>>;

  constructor(
    key: string,
    controlType: TerraControlTypeEnum,
    label: string,
    options: TerraFormFieldBaseContainerOptions = {}
  ) {
    super(key, controlType, label, false, options);

    this.containerEntries = options['containerEntries'] || [];
  }
}
