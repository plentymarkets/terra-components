import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldColorPickerOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldColorPicker extends TerraFormFieldBase<number>
{
    public type:string;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldColorPickerOptions = {})
    {
        super(key, TerraControlTypeEnum.COLOR_PICKER, label, required, options);

        this.type = options['type'] || '';
    }
}
