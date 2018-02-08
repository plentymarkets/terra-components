import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/controlType.enum';

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

    constructor(key:string, options:TerraFormFieldInputTextOptions = {})
    {
        super(key, TerraControlTypeEnum.INPUT_TEXT, options);

        this.type = options['type'] || '';
    }
}
