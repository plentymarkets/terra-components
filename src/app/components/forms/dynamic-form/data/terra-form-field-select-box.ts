import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { ControlTypeEnum } from '../enum/controlType.enum';

/**
 * @author mfrank
 */

export interface TerraFormFieldSelectBoxOptions extends TerraFormFieldBaseOptions<any>
{
    selectBoxValues?:Array<TerraSelectBoxValueInterface>;
}

export class TerraFormFieldSelectBox extends TerraFormFieldBase<any>
{
    public selectBoxValues:Array<TerraSelectBoxValueInterface>;

    public constructor(key:string, options:TerraFormFieldSelectBoxOptions = {})
    {
        super(key, ControlTypeEnum.SELECT_BOX, options);

        this.selectBoxValues = options['selectBoxValues'] || [];
    }
}
