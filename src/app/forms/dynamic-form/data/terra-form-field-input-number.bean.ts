import { TerraFormFieldBaseBean } from './terra-form-field-base.bean';

/**
 * @author mfrank
 */
export class TerraFormFieldInputNumberBean extends TerraFormFieldBaseBean<string>
{
    controlType = 'inputNumber';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}