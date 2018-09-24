import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 *@author Ziyad.Hajj-Hassan
 */
export interface TerraFormFieldColorPickerOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
}

export class TerraFormFieldColorPicker extends TerraFormFieldBase<number>
{
    public type:string;

    constructor(key:string, label:string, required:boolean,  options:TerraFormFieldColorPickerOptions = {})
    {
        super(key, TerraControlTypeEnum.COLOR_PICKER, label, required, options);

        this.type = options['type'] || '';
    }
}
