import { TerraFormFieldBase } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import {
    TerraFormFieldBaseContainer,
    TerraFormFieldBaseContainerOptions
} from './terra-form-field-base-container';

/**
 * @author mfrank
 */
export class TerraFormFieldHorizontalContainer extends TerraFormFieldBaseContainer
{
    public containerEntries:Array<TerraFormFieldBase<any>>;

    constructor(key:string, label:string, options:TerraFormFieldBaseContainerOptions = {})
    {
        super(key, TerraControlTypeEnum.HORIZONTAL_CONTAINER, label, options);

        this.containerEntries = options['containerEntries'] || [];
    }
}
