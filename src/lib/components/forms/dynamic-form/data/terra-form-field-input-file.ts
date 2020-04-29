import { TerraFormFieldBase, TerraFormFieldBaseOptions } from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldInputFileOptions extends TerraFormFieldBaseOptions<number> {
    type?: string;
    inputAllowedExtensions?: Array<string>;
    inputAllowFolders?: boolean;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldInputFile extends TerraFormFieldBase<number> {
    public type: string;
    public inputAllowedExtensions: Array<string> = [];

    constructor(key: string, label: string, required: boolean, options: TerraFormFieldInputFileOptions = {}) {
        super(key, TerraControlTypeEnum.INPUT_FILE, label, required, options);

        this.type = options.type || '';
        this.inputAllowedExtensions = options.inputAllowedExtensions || [];
    }
}
