import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @author z.hajjhassan
 */
export interface TerraFormFieldInputFileOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
    inputAllowedExtensions?:string[];
    inputAllowFolders?:boolean;
}

export class TerraFormFieldInputFile extends TerraFormFieldBase<number>
{
    public type:string;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldInputFileOptions = {})
    {
        super(key, TerraControlTypeEnum.INPUT_FILE, label, required, options);

        this.type = options.type || '';
    }
}
