import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

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

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldInputDoubleOptions = {})
    {
        super(key, TerraControlTypeEnum.INPUT_DOUBLE, label, required, options);

        this.type = options['type'] || '';
    }
}
