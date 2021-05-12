import { Type } from '@angular/core';
import { TerraFormTypeInterface } from './terra-form-type.interface';
import { TerraFileInputComponent } from '../../input/file-input/terra-file-input.component';
import {
    CheckboxComponent,
    ColorPickerComponent,
    DatePickerComponent,
    DoubleInputComponent,
    MultiSelectComponent,
    NumberInputComponent,
    SelectComponent,
    SliderComponent,
    SuggestionComponent,
    TextAreaComponent,
    TextInputComponent
} from '../form-components';
import { TerraCategoryPickerComponent } from '../../../data-picker/category-picker/terra-category-picker.component';
import { TerraNoteEditorComponent } from '../../../editors/note-editor/terra-note-editor.component';
import { TerraCodeEditorComponent } from '../../../editors/code-editor/terra-code-editor.component';
import { TerraPortletComponent } from '../../../layouts/portlet/terra-portlet.component';

/**
 * @description A map of control types that may be passed to the <terra-form> in order to support those controls.
 * Please note: All of the control types contained in this map have to implement the ControlValueAccessor interface.
 */
export class FormTypeMap {
    public readonly checkbox: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: CheckboxComponent
    };
    public readonly date: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: DatePickerComponent
    };
    public readonly file: TerraFormTypeInterface = {
        inputMap: {
            required: 'inputIsRequired'
        },
        component: TerraFileInputComponent
    };
    public readonly text: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired',
            iban: 'isIban'
        },
        component: TextInputComponent
    };
    public readonly textarea: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: TextAreaComponent
    };
    public readonly number: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: NumberInputComponent
    };
    public readonly double: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: DoubleInputComponent
    };
    public readonly select: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: SelectComponent
    };
    public readonly category: Type<TerraCategoryPickerComponent> = TerraCategoryPickerComponent;
    public readonly color: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: ColorPickerComponent
    };
    public readonly checkboxGroup: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: MultiSelectComponent
    };
    public readonly slider: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: SliderComponent
    };
    public readonly noteEditor: TerraFormTypeInterface = {
        inputMap: {
            name: 'inputHeaderLabel'
        },
        component: TerraNoteEditorComponent
    };
    public readonly codeEditor: TerraFormTypeInterface = {
        inputMap: {
            name: 'inputHeaderLabel'
        },
        component: TerraCodeEditorComponent
    };

    public readonly suggestion: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: SuggestionComponent
    };

    // CONTAINER TYPES
    public readonly portlet: TerraFormTypeInterface = {
        inputMap: {
            name: 'inputPortletHeader'
        },
        component: TerraPortletComponent
    };
}
