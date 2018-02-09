import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import { TerraFormFieldHorizontalContainerOptions } from '../../../../../../dist/app/components/forms/dynamic-form/data/terra-form-field-horizontal-container';

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

    constructor(key:string, controlType:TerraControlTypeEnum, options:TerraFormFieldBaseContainerOptions = {})
    {
        super(key, controlType, options);

        this.containerEntries = options['containerEntries'] || [];
    }
}
