import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';

/**
 * @author mfrank
 */
export interface TerraFormFieldInputTextOptions extends TerraFormFieldBaseOptions<string>
{
    type?:string;
}

export class TerraFormFieldInputText extends TerraFormFieldBase<string>
{
    type: string;

    constructor(key:string, options:TerraFormFieldInputTextOptions = {}) {
        super(key, 'inputText', options);

        this.type = options['type'] || '';
    }
}