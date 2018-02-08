import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { ControlTypeEnum } from '../enum/controlType.enum';

export interface TerraFormFieldCheckBoxOptions extends TerraFormFieldBaseOptions<boolean>
{
    type?:string;
}

export class TerraFormFieldCheckBox extends TerraFormFieldBase<boolean>
{
    public type:string;

    constructor(key:string, options:TerraFormFieldCheckBoxOptions = {})
    {
        super(key, ControlTypeEnum.CHECK_BOX, options);

        this.type = options['type'] || '';
    }
}


