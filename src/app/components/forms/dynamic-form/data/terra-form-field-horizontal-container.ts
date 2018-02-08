import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { ControlTypeEnum } from '../enum/controlType.enum';

/**
 * @author mfrank
 */
export interface TerraFormFieldHorizontalContainerOptions extends TerraFormFieldBaseOptions<string>
{
    containerEntries?:Array<TerraFormFieldBase<any>>;
}

export class TerraFormFieldHorizontalContainer extends TerraFormFieldBase<string>
{
    public containerEntries:Array<TerraFormFieldBase<any>>;

    constructor(key:string, options:TerraFormFieldHorizontalContainerOptions = {})
    {
        super(key, ControlTypeEnum.HORIZONTAL_CONTAINER, options);

        this.containerEntries = options['containerEntries'] || [];
    }
}
