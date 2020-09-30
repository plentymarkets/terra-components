import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldCheckBoxOptions extends TerraFormFieldBaseOptions<boolean> {
    type?: string;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldCheckBox extends TerraFormFieldBase<boolean> {
    public type: string;

    constructor(key: string, label: string, required: boolean, options: TerraFormFieldCheckBoxOptions = {}) {
        super(key, TerraControlTypeEnum.CHECK_BOX, label, required, options);

        this.type = options['type'] || '';
    }
}
