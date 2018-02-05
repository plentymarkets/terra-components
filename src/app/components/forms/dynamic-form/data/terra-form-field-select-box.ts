import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

/**
 * @author mfrank
 */

export interface TerraFormFieldSelectBoxOptions extends TerraFormFieldBaseOptions<string | number | boolean>
{
    selectBoxValues?:Array<TerraSelectBoxValueInterface>;
}

export class TerraFormFieldSelectBox extends TerraFormFieldBase<string | number | boolean>
{
    selectBoxValues:Array<TerraSelectBoxValueInterface>;

    constructor(key:string, options:TerraFormFieldSelectBoxOptions = {}) {
        super(key, 'selectBox', options);

        this.selectBoxValues = options['selectBoxValues'] || [];
    }
}