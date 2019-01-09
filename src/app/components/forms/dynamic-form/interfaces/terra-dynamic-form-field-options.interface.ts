import { TerraDynamicFormFields } from './terra-dynamic-form.fields';
import { TerraFormFieldBaseOptions } from '../data/terra-form-field-base';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { TerraMultiCheckBoxValueInterface } from '../../multi-check-box/data/terra-multi-check-box-value.interface';

export interface TerraDynamicFormFieldOptionsInterface extends TerraFormFieldBaseOptions<any>
{
    containerEntries?:TerraDynamicFormFields;
    selectBoxValues?:Array<TerraSelectBoxValueInterface>;
    checkBoxValues?:Array<TerraMultiCheckBoxValueInterface>;
}
