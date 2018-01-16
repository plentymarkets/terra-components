import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';

/**
 * @author mfrank
 */
// .interafce oder .option?
export interface TerraFormFieldInputNumberOptions extends TerraFormFieldBaseOptions<string>
{
    type?:string;
}

export class TerraFormFieldInputNumber extends TerraFormFieldBase<string>
{
    type: string;

    constructor(key:string, options:TerraFormFieldInputNumberOptions = {}) {
        super(key, 'inputNumber', options);

        this.type = options['type'] || '';
    }
}