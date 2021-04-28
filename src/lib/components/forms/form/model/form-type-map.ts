import { Type } from '@angular/core';
import { CheckboxGroupComponent } from '../../checkbox-group/checkbox-group.component';
import { TerraFormTypeInterface } from './terra-form-type.interface';
import { TerraCheckboxComponent } from '../../checkbox/terra-checkbox.component';
import { TerraDatePickerComponent } from '../../input/date-picker/terra-date-picker.component';
import { TerraFileInputComponent } from '../../input/file-input/terra-file-input.component';
import { TerraTextInputComponent } from '../../input/text-input/terra-text-input.component';
import { TerraTextAreaInputComponent } from '../../input/text-area-input/terra-text-area-input.component';
import { TerraNumberInputComponent } from '../../input/number-input/terra-number-input.component';
import { TerraSelectBoxComponent } from '../../select-box/terra-select-box.component';
import { TerraCategoryPickerComponent } from '../../../data-picker/category-picker/terra-category-picker.component';
import { TerraColorPickerComponent } from '../../input/color-picker/terra-color-picker.component';
import { TerraNoteEditorComponent } from '../../../editors/note-editor/terra-note-editor.component';
import { TerraCodeEditorComponent } from '../../../editors/code-editor/terra-code-editor.component';
import { TerraSliderComponent } from '../../slider/terra-slider.component';
import { TerraPortletComponent } from '../../../layouts/portlet/terra-portlet.component';
import { TerraSuggestionBoxComponent } from '../../suggestion-box/terra-suggestion-box.component';
import { DoubleInputComponent } from '../form-components/double-input/double-input.component';

/**
 * @description A map of control types that may be passed to the <terra-form> in order to support those controls.
 * Please note: All of the control types contained in this map have to implement the ControlValueAccessor interface.
 */
export class FormTypeMap {
    public readonly checkbox: TerraFormTypeInterface = {
        inputMap: {
            name: 'inputCaption'
        },
        component: TerraCheckboxComponent
    };
    public readonly date: TerraFormTypeInterface = {
        inputMap: {
            required: 'inputIsRequired'
        },
        component: TerraDatePickerComponent
    };
    public readonly file: TerraFormTypeInterface = {
        inputMap: {
            required: 'inputIsRequired'
        },
        component: TerraFileInputComponent
    };
    public readonly text: TerraFormTypeInterface = {
        inputMap: {
            required: 'inputIsRequired'
        },
        component: TerraTextInputComponent
    };
    public readonly textarea: TerraFormTypeInterface = {
        inputMap: {
            required: 'inputIsRequired'
        },
        component: TerraTextAreaInputComponent
    };
    public readonly number: TerraFormTypeInterface = {
        inputMap: {
            required: 'inputIsRequired'
        },
        component: TerraNumberInputComponent
    };
    public readonly double: TerraFormTypeInterface = {
        inputMap: {
            required: 'isRequired'
        },
        component: DoubleInputComponent
    };
    public readonly select: TerraFormTypeInterface = {
        inputMap: {
            required: 'inputIsRequired'
        },
        component: TerraSelectBoxComponent
    };
    public readonly category: Type<TerraCategoryPickerComponent> = TerraCategoryPickerComponent;
    public readonly color: TerraFormTypeInterface = {
        inputMap: {
            required: 'inputIsRequired'
        },
        component: TerraColorPickerComponent
    };
    public readonly checkboxGroup: Type<CheckboxGroupComponent> = CheckboxGroupComponent;
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
