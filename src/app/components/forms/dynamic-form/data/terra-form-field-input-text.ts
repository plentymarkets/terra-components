import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @author mfrank
 */
export interface TerraFormFieldInputTextOptions extends TerraFormFieldBaseOptions<string>
{
    type?:string;
}

export class TerraFormFieldInputText extends TerraFormFieldBase<string>
{
    public type:string;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldInputTextOptions = {})
    {
        super(key, TerraControlTypeEnum.INPUT_TEXT, label, required, options);

        this.type = options['type'] || '';
    }
}
