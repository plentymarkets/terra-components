import { TerraFormFieldBaseBean } from './terra-form-field-base.bean';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

/**
 * @author mfrank
 */
export class TerraFormFieldConditionalContainerBean extends TerraFormFieldBaseBean<string>
{
    controlType = 'conditionalContainer';
    conditionalType:string;
    conditionalValues:Array<TerraSelectBoxValueInterface> | Array<{ [key:string]:string | number | boolean }>;
    conditionalEntries:{ [key:string]:Array<TerraFormFieldBaseBean<any>> };

    constructor(options: {} = {}) {
        super(options);
        this.conditionalType = options['conditionalType'] || '';
        this.conditionalValues = options['conditionalValues'] || '';
        this.conditionalEntries = options['conditionalEntries'] || '';
    }
}