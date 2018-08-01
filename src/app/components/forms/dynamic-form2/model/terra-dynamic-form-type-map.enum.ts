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
    public readonly checkbox:Type<TerraCheckboxComponent>           = TerraCheckboxComponent;
    public readonly date:Type<TerraDatePickerComponent>             = TerraDatePickerComponent;
    public readonly file:Type<TerraFileInputComponent>              = TerraFileInputComponent;
    public readonly text:Type<TerraTextInputComponent>              = TerraTextInputComponent;
    public readonly textarea:Type<TerraTextAreaInputComponent>      = TerraTextAreaInputComponent;
    public readonly number:Type<TerraNumberInputComponent>          = TerraNumberInputComponent;
    public readonly double:Type<TerraDoubleInputComponent>          = TerraDoubleInputComponent;
    public readonly select:Type<TerraSelectBoxComponent>            = TerraSelectBoxComponent;
    public readonly category:Type<TerraCategoryPickerComponent>     = TerraCategoryPickerComponent;
    public readonly color:Type<TerraColorPickerComponent>           = TerraColorPickerComponent;
    public readonly checkboxGroup:Type<TerraMultiCheckBoxComponent> = TerraMultiCheckBoxComponent;
    public readonly noteEditor:Type<TerraNoteEditorComponent>       = TerraNoteEditorComponent;
}
