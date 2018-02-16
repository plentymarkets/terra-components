import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @author dtrauf
 */
export interface TerraFormFieldTextAreaOptions extends TerraFormFieldBaseOptions<string>
{
    type?:string;
}

export class TerraFormFieldTextArea extends TerraFormFieldBase<string>
{
    public type:string;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldTextAreaOptions = {})
    {
        super(key, TerraControlTypeEnum.INPUT_TEXT_AREA, label, required, options);

        this.type = options['type'] || '';
    }
}
