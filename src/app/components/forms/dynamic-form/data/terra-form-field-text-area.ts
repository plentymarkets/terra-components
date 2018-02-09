import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/controlType.enum';

/**
 * @author dtrauf
 */
export interface TerraFormFieldInputTextOptions extends TerraFormFieldBaseOptions<string>
{
    type?:string;
}

export class TerraFormFieldTextArea extends TerraFormFieldBase<string>
{
    public type:string;

    constructor(key:string, options:TerraFormFieldInputTextOptions = {})
    {
        super(key, TerraControlTypeEnum.INPUT_TEXT_AREA, options);

        this.type = options['type'] || '';
    }
}
