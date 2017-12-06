import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';

/**
 * @author mfrank
 */
export interface TerraFormFieldHorizontalContainerOptions extends TerraFormFieldBaseOptions<string>
{
    containerEntries?:Array<TerraFormFieldBase<any>>;
}

export class TerraFormFieldHorizontalContainer extends TerraFormFieldBase<string>
{
    containerEntries:Array<TerraFormFieldBase<any>>;

    constructor(key:string, options:TerraFormFieldHorizontalContainerOptions = {}) {
        super(key, 'horizontalContainer', options);

        this.containerEntries = options['containerEntries'] || [];
    }
}