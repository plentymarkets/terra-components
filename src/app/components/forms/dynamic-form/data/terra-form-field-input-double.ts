import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/controlType.enum';

/**
 * @author dtrauf
 */
export interface TerraFormFieldInputDoubleOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
}

export class TerraFormFieldInputDouble extends TerraFormFieldBase<number>
{
    public type:string;

    constructor(key:string, options:TerraFormFieldInputDoubleOptions = {})
    {
        super(key, TerraControlTypeEnum.INPUT_DOUBLE, options);

        this.type = options['type'] || '';
    }
}
