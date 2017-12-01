import { TerraFormFieldBaseBean } from './terra-form-field-base.bean';

/**
 * @author mfrank
 */
export class TerraFormFieldInputTextBean extends TerraFormFieldBaseBean<string>
{
    controlType = 'inputText';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}