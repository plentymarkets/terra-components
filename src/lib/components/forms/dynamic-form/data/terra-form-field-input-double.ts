import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldInputDoubleOptions extends TerraFormFieldBaseOptions<number> {
    type?: string;
    isPrice?: boolean;
    decimalCount?: number;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldInputDouble extends TerraFormFieldBase<number> {
    public type: string;
    public isPrice: boolean;
    public decimalCount: number;

    constructor(key: string, label: string, required: boolean, options: TerraFormFieldInputDoubleOptions = {}) {
        super(key, TerraControlTypeEnum.INPUT_DOUBLE, label, required, options);

        this.type = options.type || '';
        this.isPrice = !!options.isPrice;
        this.decimalCount = this.decimalCount || 2; // default value 2 analogous to terra-double-input.component
    }
}
