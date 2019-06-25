import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

export interface TerraFormFieldCheckBoxOptions extends TerraFormFieldBaseOptions<boolean>
{
    type?:string;
}

export class TerraFormFieldCheckBox extends TerraFormFieldBase<boolean>
{
    public type:string;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldCheckBoxOptions = {})
    {
        super(key, TerraControlTypeEnum.CHECK_BOX, label, required, options);

        this.type = options['type'] || '';
    }
}


