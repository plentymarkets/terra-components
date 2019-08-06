import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

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

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldSelectBoxOptions = {})
    {
        super(key, TerraControlTypeEnum.SELECT_BOX, label, required, options);

        this.selectBoxValues = options['selectBoxValues'] || [];
    }
}
