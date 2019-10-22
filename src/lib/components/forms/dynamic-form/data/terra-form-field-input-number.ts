import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldInputNumberOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldInputNumber extends TerraFormFieldBase<number>
{
    public type:string;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldInputNumberOptions = {})
    {
        super(key, TerraControlTypeEnum.INPUT_NUMBER, label, required, options);

        this.type = options['type'] || '';
    }
}
