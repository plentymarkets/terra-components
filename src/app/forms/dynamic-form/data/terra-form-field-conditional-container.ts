import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

/**
 * @author mfrank
 */
export interface TerraFormFieldConditionalContainerOptions extends TerraFormFieldBaseOptions<string>
{
    conditionalValues?:Array<TerraSelectBoxValueInterface> | Array<{ [key:string]:string | number | boolean }>;
    conditionalEntries?:{ [key:string]:Array<TerraFormFieldBase<any>> };
}

export class TerraFormFieldConditionalContainer extends TerraFormFieldBase<string>
{
    conditionalType:string;
    conditionalValues:Array<TerraSelectBoxValueInterface> | Array<{ [key:string]:string | number | boolean }>;
    conditionalEntries:{ [key:string]:Array<TerraFormFieldBase<any>> };

    constructor(key:string, conditionalType:string, options:TerraFormFieldConditionalContainerOptions = {}) {
        super(key, 'conditionalContainer', options);

        this.conditionalType = conditionalType;
        this.conditionalValues = options['conditionalValues'] || [];
        this.conditionalEntries = options['conditionalEntries'] || {};
    }
}