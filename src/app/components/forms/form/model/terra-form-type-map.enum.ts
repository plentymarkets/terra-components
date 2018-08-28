import {
    TerraCategoryPickerComponent,
    TerraCheckboxComponent,
    TerraCodeEditorComponent,
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
import { TerraFormTypeInterface } from './terra-form-type.interface';

export class TerraFormTypeMap
{
    public readonly checkbox:TerraFormTypeInterface = {
        inputMap: {
            name: 'inputCaption'
        },
        component: TerraCheckboxComponent
    };
    public readonly date:Type<TerraDatePickerComponent> = TerraDatePickerComponent;
    public readonly file:Type<TerraFileInputComponent> = TerraFileInputComponent;
    public readonly text:Type<TerraTextInputComponent> = TerraTextInputComponent;
    public readonly textarea:Type<TerraTextAreaInputComponent> = TerraTextAreaInputComponent;
    public readonly number:Type<TerraNumberInputComponent> = TerraNumberInputComponent;
    public readonly double:Type<TerraDoubleInputComponent> = TerraDoubleInputComponent;
    public readonly select:Type<TerraSelectBoxComponent> = TerraSelectBoxComponent;
    public readonly category:Type<TerraCategoryPickerComponent> = TerraCategoryPickerComponent;
    public readonly color:Type<TerraColorPickerComponent> = TerraColorPickerComponent;
    public readonly checkboxGroup:Type<TerraMultiCheckBoxComponent> = TerraMultiCheckBoxComponent;
    public readonly noteEditor:TerraFormTypeInterface = {
        inputMap: {
            name: 'inputHeaderLabel'
        },
        component: TerraNoteEditorComponent
    };
    public readonly codeEditor:TerraFormTypeInterface = {
        inputMap: {
            name: 'inputHeaderLabel'
        },
        component: TerraCodeEditorComponent
    };
}
