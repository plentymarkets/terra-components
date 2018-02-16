import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @author mfrank
 */
export interface TerraFormFieldDatePickerOptions extends TerraFormFieldBaseOptions<string>
{
    openCalenderTop?:boolean;
}

export class TerraFormFieldDatePicker extends TerraFormFieldBase<string>
{
    public openCalenderTop:boolean;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldDatePickerOptions = {})
    {
        super(key, TerraControlTypeEnum.DATE_PICKER, label, required, options);

        this.openCalenderTop = !!options.openCalenderTop;
    }
}
