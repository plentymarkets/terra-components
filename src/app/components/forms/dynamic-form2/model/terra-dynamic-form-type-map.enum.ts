import {
    TerraCategoryPickerComponent,
    TerraCheckboxComponent,
    TerraColorPickerComponent,
    TerraDatePickerComponent,
    TerraDoubleInputComponent,
    TerraFileInputComponent,
    TerraMultiCheckBoxComponent,
    TerraNoteEditorComponent,
    TerraNumberInputComponent,
    TerraSelectBoxComponent,
    TerraTextAreaInputComponent,
    TerraTextInputComponent
} from '../../../../../';
import { Type } from '@angular/core';

export class TerraDynamicFormTypeMap
{
    public static readonly checkbox:Type<TerraCheckboxComponent>        = TerraCheckboxComponent;
    public static readonly date:Type<TerraDatePickerComponent>          = TerraDatePickerComponent;
    public static readonly file:Type<TerraFileInputComponent>           = TerraFileInputComponent;
    public static readonly text:Type<TerraTextInputComponent>           = TerraTextInputComponent;
    public static readonly textarea:Type<TerraTextAreaInputComponent>   = TerraTextAreaInputComponent;
    public static readonly number:Type<TerraNumberInputComponent>       = TerraNumberInputComponent;
    public static readonly double:Type<TerraDoubleInputComponent>       = TerraDoubleInputComponent;
    public static readonly select:Type<TerraSelectBoxComponent>         = TerraSelectBoxComponent;
    public static readonly category:Type<TerraCategoryPickerComponent>  = TerraCategoryPickerComponent;
    public static readonly color:Type<TerraColorPickerComponent>        = TerraColorPickerComponent;
    public static readonly checkboxGroup:Type<TerraMultiCheckBoxComponent>  = TerraMultiCheckBoxComponent;
    public static readonly noteEditor:Type<TerraNoteEditorComponent>    = TerraNoteEditorComponent;
}
