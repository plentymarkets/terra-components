import { Type } from '@angular/core';
import { TerraFormTypeInterface } from './terra-form-type.interface';
import { TerraFileInputComponent } from '../../input/file-input/terra-file-input.component';
import { NumberInputComponent } from '../form-components/number-input/number-input.component';
import { TerraDoubleInputComponent } from '../../input/double-input/terra-double-input.component';
import { SelectComponent } from '../form-components/select/select.component';
import { TerraCategoryPickerComponent } from '../../../data-picker/category-picker/terra-category-picker.component';
import { TerraNoteEditorComponent } from '../../../editors/note-editor/terra-note-editor.component';
import { TerraCodeEditorComponent } from '../../../editors/code-editor/terra-code-editor.component';
import { TerraSliderComponent } from '../../slider/terra-slider.component';
import { TerraPortletComponent } from '../../../layouts/portlet/terra-portlet.component';
import { TerraSuggestionBoxComponent } from '../../suggestion-box/terra-suggestion-box.component';
import { MultiSelectComponent } from '../form-components/multi-select/multi-select.component';
import { ColorPickerComponent } from '../form-components/color-picker/color-picker.component';
import { DatePickerComponent } from '../form-components/datepicker/datepicker.component';
import { TextInputComponent } from '../form-components/text-input/text-input.component';
import { CheckboxComponent } from '../form-components/checkbox/checkbox.component';
import { TextAreaComponent } from '../form-components/text-area/text-area.component';

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
            required: 'inputIsRequired'
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
            required: 'inputIsRequired'
        },
        component: TerraDoubleInputComponent
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
    public readonly slider: Type<TerraSliderComponent> = TerraSliderComponent;
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
            required: 'inputIsRequired'
        },
        component: TerraSuggestionBoxComponent
    };

    // CONTAINER TYPES
    public readonly portlet: TerraFormTypeInterface = {
        inputMap: {
            name: 'inputPortletHeader'
        },
        component: TerraPortletComponent
    };
}
