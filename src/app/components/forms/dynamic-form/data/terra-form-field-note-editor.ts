import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 *@author Tim Wieder & Maxi Roell
 */
export interface TerraFormFieldNoteEditorOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
}

export class TerraFormFieldNoteEditor extends TerraFormFieldBase<number>
{
    public type:string;

    constructor(key:string, label:string, required:boolean,  options:TerraFormFieldNoteEditorOptions = {})
    {
        super(key, TerraControlTypeEnum.NOTE_EDITOR, label, required, options);

        this.type = options.type || '';
    }
}
