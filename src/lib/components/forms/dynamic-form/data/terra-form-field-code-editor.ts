import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldCodeEditorOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
    fixedHeight?:string;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldCodeEditor extends TerraFormFieldBase<number>
{
    public type:string;
    public fixedHeight:string;

    constructor(key:string, label:string, required:boolean, options:TerraFormFieldCodeEditorOptions = {})
    {
        super(key, TerraControlTypeEnum.CODE_EDITOR, label, required, options);

        this.type = options.type || '';
        this.fixedHeight = options.fixedHeight || '';
    }
}
