import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 *@author Tim Wieder & Maxi Roell
 */
export interface TerraFormFieldCodeEditorOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
    fixedHeight?:string;
}

export class TerraFormFieldCodeEditor extends TerraFormFieldBase<number>
{
    public type:string;
    public fixedHeight:string;

    constructor(key:string, label:string, required:boolean,  options:TerraFormFieldCodeEditorOptions = {})
    {
        super(key, TerraControlTypeEnum.CODE_EDITOR, label, required, options);

        this.type = options.type || '';
        this.fixedHeight = options.fixedHeight || '';
    }
}
