import { TerraFormFieldBaseBean } from './terra-form-field-base.bean';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

/**
 * @author mfrank
 */
export class TerraFormFieldSelectBoxBean extends TerraFormFieldBaseBean<string | number | boolean>
{
    controlType = 'selectBox';
    selectBoxValues:Array<TerraSelectBoxValueInterface>;

    constructor(options: {} = {}) {
        super(options);
        this.selectBoxValues = options['selectBoxValues'] || '';
    }
}