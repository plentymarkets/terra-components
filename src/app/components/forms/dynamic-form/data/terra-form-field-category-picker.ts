import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import { TerraCategoryPickerBaseService } from '../../../category-picker/service/terra-category-picker-base.service';

/**
 *@author Ziyad.Hajj-Hassan
 */
export interface TerraFormFieldCategoryPickerOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
    categoryService?:TerraCategoryPickerBaseService;
}

export class TerraFormFieldCategoryPicker extends TerraFormFieldBase<number>
{
    public type:string;
    public categoryService:TerraCategoryPickerBaseService;

    constructor(key:string, label:string, required:boolean,  options:TerraFormFieldCategoryPickerOptions = {})
    {
        super(key, TerraControlTypeEnum.CATEGORY_PICKER, label, required, options);

        this.type = options['type'] || '';
        this.categoryService = options.categoryService;
    }
}
