import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';

export interface TerraFormFieldCheckBoxOptions extends TerraFormFieldBaseOptions<boolean>
{
    type?:string;
}

export class TerraFormFieldCheckBox extends TerraFormFieldBase<boolean>
{
    type: string;

    constructor(key:string, options:TerraFormFieldCheckBoxOptions = {}) {
        super(key, 'checkBox', options);
        this.type = options['type'] || '';
    }
}


