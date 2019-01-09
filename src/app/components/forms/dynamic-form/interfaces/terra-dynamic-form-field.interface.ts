import { TerraDynamicFormFieldOptionsInterface } from './terra-dynamic-form-field-options.interface';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

export interface TerraDynamicFormFieldInterface
{
    type:TerraControlTypeEnum;
    label:string;
    required?:boolean;
    options?:TerraDynamicFormFieldOptionsInterface;
}
