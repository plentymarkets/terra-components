import { TerraDynamicFormFields } from './terra-dynamic-form.fields';
import { TerraFormFieldBaseOptions } from '../data/terra-form-field-base';

export interface TerraDynamicFormFieldOptionsInterface extends TerraFormFieldBaseOptions<any>
{
    containerEntries?:TerraDynamicFormFields;
}
