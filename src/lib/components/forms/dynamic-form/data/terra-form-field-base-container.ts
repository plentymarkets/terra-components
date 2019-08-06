import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @author mfrank
 */
export interface TerraFormFieldBaseContainerOptions extends TerraFormFieldBaseOptions<string>
{
    containerEntries?:Array<TerraFormFieldBase<any>>;
}

export class TerraFormFieldBaseContainer extends TerraFormFieldBase<string>
{
    public containerEntries:Array<TerraFormFieldBase<any>>;

    constructor(key:string, controlType:TerraControlTypeEnum, label:string, options:TerraFormFieldBaseContainerOptions = {})
    {
        super(key, controlType, label, false, options);

        this.containerEntries = options['containerEntries'] || [];
    }
}
