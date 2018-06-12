import {
    TerraFormFieldBase,
    TerraFormFieldBaseOptions
} from './terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import { TerraCategoryPickerBaseService } from '../../../category-picker/service/terra-category-picker-base.service';

/**
 *@author Tim Wieder && Maxi Roell
 */
export interface TerraFormFieldNoteEditorOptions extends TerraFormFieldBaseOptions<number>
{
    type?:string;
}

export class TerraFormFieldNoteEditor extends TerraFormFieldBase<number>
{
    public type:string;
    public categoryService:TerraCategoryPickerBaseService;

    constructor(key:string, label:string, required:boolean,  options:TerraFormFieldNoteEditorOptions = {})
    {
        super(key, TerraControlTypeEnum.NOTE_EDITOR, label, required, options);

        this.type = options.type || '';
    }
}
