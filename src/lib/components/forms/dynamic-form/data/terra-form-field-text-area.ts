import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldTextAreaOptions extends TerraFormFieldBaseOptions<string> {
  type?: string;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldTextArea extends TerraFormFieldBase<string> {
  public type: string;

  constructor(
    key: string,
    label: string,
    required: boolean,
    options: TerraFormFieldTextAreaOptions = {}
  ) {
    super(key, TerraControlTypeEnum.INPUT_TEXT_AREA, label, required, options);

    this.type = options['type'] || '';
  }
}
