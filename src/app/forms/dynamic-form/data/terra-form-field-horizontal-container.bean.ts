import { TerraFormFieldBaseBean } from './terra-form-field-base.bean';

/**
 * @author mfrank
 */
export class TerraFormFieldHorizontalContainerBean extends TerraFormFieldBaseBean<string>
{
    controlType = 'horizontalContainer';
    containerEntries:Array<TerraFormFieldBaseBean<any>>;

    constructor(options: {} = {}) {
        super(options);
        this.containerEntries = options['containerEntries'] || '';
    }
}