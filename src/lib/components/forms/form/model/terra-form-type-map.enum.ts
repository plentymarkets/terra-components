import { Type } from '@angular/core';
import { TerraFormTypeInterface } from './terra-form-type.interface';
import { TerraCheckboxComponent } from '../../checkbox/terra-checkbox.component';
import { TerraDatePickerComponent } from '../../input/date-picker/terra-date-picker.component';
import { TerraFileInputComponent } from '../../input/file-input/terra-file-input.component';
import { TerraTextInputComponent } from '../../input/text-input/terra-text-input.component';
import { TerraTextAreaInputComponent } from '../../input/text-area-input/terra-text-area-input.component';
import { TerraNumberInputComponent } from '../../input/number-input/terra-number-input.component';
import { TerraDoubleInputComponent } from '../../input/double-input/terra-double-input.component';
import { TerraSelectBoxComponent } from '../../select-box/terra-select-box.component';
import { TerraCategoryPickerComponent } from '../../../data-picker/category-picker/terra-category-picker.component';
import { TerraColorPickerComponent } from '../../input/color-picker/terra-color-picker.component';
import { TerraMultiCheckBoxComponent } from '../../multi-check-box/terra-multi-check-box.component';
import { TerraSliderComponent } from '../../slider/terra-slider.component';
import { TerraNoteEditorComponent } from '../../../editors/note-editor/terra-note-editor.component';
import { TerraCodeEditorComponent } from '../../../editors/code-editor/terra-code-editor.component';

/**
 * @deprecated use FormTypeMap instead. It now uses the `CheckboxGroupComponent` to render a 'checkboxGroup'.
 * TODO: If any changes to this class are necessary, please apply the changes to the FormTypeMap as well.
 */
export class TerraFormTypeMap {
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
            required: 'inputIsRequired'
        },
        component: TerraDoubleInputComponent
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
    public readonly checkboxGroup: Type<TerraMultiCheckBoxComponent> = TerraMultiCheckBoxComponent;
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

    constructor() {
        console.warn('Usage of deprecated class `TerraFormTypeMap`. Please consider using `FormTypeMap` instead.');
    }
}
