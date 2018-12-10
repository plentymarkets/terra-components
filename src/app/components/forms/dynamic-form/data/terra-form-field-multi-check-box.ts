import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import {
    TerraControlTypeEnum,
    TerraMultiCheckBoxValueInterface
} from '../../../../..';

export interface TerraFormFieldMultiCheckBoxOptions extends TerraFormFieldBaseOptions<any>
{
    checkBoxValues?:Array<TerraMultiCheckBoxValueInterface>;
}

export class TerraFormFieldMultiCheckBox extends TerraFormFieldBase<any>
{
    public checkBoxValues:Array<TerraMultiCheckBoxValueInterface>;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldMultiCheckBoxOptions = {})
    {
        super(key, TerraControlTypeEnum.MULTI_CHECK_BOX, label, required, options);

        this.defaultValue = options['checkBoxValues'] || [];
    }
}
