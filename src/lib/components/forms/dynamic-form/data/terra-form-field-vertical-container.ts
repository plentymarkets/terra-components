import { TerraFormFieldBase } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import {
  TerraFormFieldBaseContainer,
  TerraFormFieldBaseContainerOptions
} from './terra-form-field-base-container';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldVerticalContainer extends TerraFormFieldBaseContainer {
  public containerEntries: Array<TerraFormFieldBase<any>>;

  constructor(key: string, label: string, options: TerraFormFieldBaseContainerOptions = {}) {
    super(key, TerraControlTypeEnum.VERTICAL_CONTAINER, label, options);

    this.containerEntries = options['containerEntries'] || [];
  }
}
