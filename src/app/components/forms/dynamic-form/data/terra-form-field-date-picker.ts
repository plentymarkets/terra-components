import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/controlType.enum';

/**
 * @author mfrank
 */
export interface TerraFormFieldDatePickerOptions extends TerraFormFieldBaseOptions<string>
{
    // actually no other options exists
}

export class TerraFormFieldDatePicker extends TerraFormFieldBase<string>
{
    public type:string;

    constructor(key:string, options:TerraFormFieldDatePickerOptions = {})
    {
        super(key, TerraControlTypeEnum.DATE_PICKER, options);
    }
}
