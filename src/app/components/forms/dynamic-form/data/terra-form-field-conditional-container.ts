import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { ControlTypeEnum } from '../enum/controlType.enum';

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
    public conditionalType:string;
    public conditionalValues:Array<TerraSelectBoxValueInterface> | Array<{ [key:string]:string | number | boolean }>;
    public conditionalEntries:{ [key:string]:Array<TerraFormFieldBase<any>> };

    public constructor(key:string, conditionalType:string, options:TerraFormFieldConditionalContainerOptions = {})
    {
        super(key, ControlTypeEnum.CONDITIONAL_CONTAINER, options);

        this.conditionalType = conditionalType;
        this.conditionalValues = options['conditionalValues'] || [];
        this.conditionalEntries = options['conditionalEntries'] || {};
    }
}
