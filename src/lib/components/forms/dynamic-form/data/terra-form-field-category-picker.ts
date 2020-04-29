import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import { TerraCategoryPickerBaseService } from '../../../data-picker/category-picker/service/terra-category-picker-base.service';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldCategoryPickerOptions extends TerraFormFieldBaseOptions<number> {
    type?: string;
    categoryService?: TerraCategoryPickerBaseService;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldCategoryPicker extends TerraFormFieldBase<number> {
    public type: string;
    public categoryService: TerraCategoryPickerBaseService;

    constructor(key: string, label: string, required: boolean, options: TerraFormFieldCategoryPickerOptions = {}) {
        super(key, TerraControlTypeEnum.CATEGORY_PICKER, label, required, options);

        this.type = options['type'] || '';
        this.categoryService = options.categoryService;
    }
}
