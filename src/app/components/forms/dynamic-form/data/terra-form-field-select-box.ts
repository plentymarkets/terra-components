import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

/**
 * @author mfrank
 */

export interface TerraFormFieldSelectBoxOptions extends TerraFormFieldBaseOptions<any>
{
    selectBoxValues?:Array<TerraSelectBoxValueInterface>;
}

export class TerraFormFieldSelectBox extends TerraFormFieldBase<any>
{
    selectBoxValues:Array<TerraSelectBoxValueInterface>;

    constructor(key:string, options:TerraFormFieldSelectBoxOptions = {}) {
        super(key, 'selectBox', options);

        this.selectBoxValues = options['selectBoxValues'] || [];
    }
}