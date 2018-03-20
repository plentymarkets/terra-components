import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraMultiSelectBoxValueInterface } from '../../multi-select-box/data/terra-multi-select-box-value.interface';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import { TerraMultiCheckBoxValueInterface } from '../../multi-check-box/data/terra-multi-check-box-value.interface';

export interface TerraFormFieldMultiCheckBoxOptions extends TerraFormFieldBaseOptions<any>
{
    checkBoxValues?:Array<TerraMultiCheckBoxValueInterface>;
}

export class TerraFormFieldMultiCheckBox extends TerraFormFieldBase<any>
{
    public checkBoxValues:Array<TerraMultiSelectBoxValueInterface>;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldMultiCheckBoxOptions = {})
    {
        super(key, TerraControlTypeEnum.MULTI_CHECK_BOX, label, required, options);

        this.defaultValue = options['defaultValue'] || [];
        this.checkBoxValues = options['checkBoxValues'] || [];
    }
}
