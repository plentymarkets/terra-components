import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldDatePickerOptions extends TerraFormFieldBaseOptions<string> {
  openCalenderTop?: boolean;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldDatePicker extends TerraFormFieldBase<string> {
  public openCalenderTop: boolean;

  constructor(
    key: string,
    label: string,
    required: boolean,
    options: TerraFormFieldDatePickerOptions = {}
  ) {
    super(key, TerraControlTypeEnum.DATE_PICKER, label, required, options);

    this.openCalenderTop = !!options.openCalenderTop;
  }
}
