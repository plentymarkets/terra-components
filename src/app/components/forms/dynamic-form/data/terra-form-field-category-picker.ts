import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 *@author Ziyad.Hajj-Hassan
 */
export interface TerraFormFieldCategoryPickerOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
}

export class TerraFormFieldCategoryPicker extends TerraFormFieldBase<number>
{
    public type:string;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldCategoryPickerOptions = {})
    {
        super(key, TerraControlTypeEnum.CATEGORY_PICKER, label, required, options);

        this.type = options['type'] || '';
    }
}
