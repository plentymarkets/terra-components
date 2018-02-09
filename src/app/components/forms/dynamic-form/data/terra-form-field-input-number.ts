import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { ControlTypeEnum } from '../enum/controlType.enum';

/**
 * @author mfrank
 */
export interface TerraFormFieldInputNumberOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
}

export class TerraFormFieldInputNumber extends TerraFormFieldBase<number>
{
    public type:string;

    constructor(key:string, options:TerraFormFieldInputNumberOptions = {})
    {
        super(key, ControlTypeEnum.INPUT_NUMBER, options);

        this.type = options['type'] || '';
    }
}
