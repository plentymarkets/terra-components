import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldInputTextOptions extends TerraFormFieldBaseOptions<string> {
  type?: string;
  isPassword?: boolean;
  isIBAN?: boolean;
  isReadOnly?: boolean;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldInputText extends TerraFormFieldBase<string> {
  public type: string;
  public isPassword: boolean;
  public isIBAN: boolean;
  public isReadOnly: boolean;

  constructor(
    key: string,
    label: string,
    required: boolean,
    options: TerraFormFieldInputTextOptions = {}
  ) {
    super(key, TerraControlTypeEnum.INPUT_TEXT, label, required, options);

    this.type = options.type || '';
    this.isPassword = !!options.isPassword;
    this.isIBAN = !!options.isIBAN;
    this.isReadOnly = !!options.isReadOnly;
  }
}
