import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import { TerraFormFieldInputText } from '../data/terra-form-field-input-text';
import { TerraFormFieldInputNumber } from '../data/terra-form-field-input-number';
import { TerraFormFieldInputDouble } from '../data/terra-form-field-input-double';
import { TerraFormFieldTextArea } from '../data/terra-form-field-text-area';
import { TerraFormFieldDatePicker } from '../data/terra-form-field-date-picker';
import { TerraFormFieldSelectBox } from '../data/terra-form-field-select-box';
import { TerraFormFieldCheckBox } from '../data/terra-form-field-check-box';
import { TerraFormFieldBaseContainer } from '../data/terra-form-field-base-container';
import { TerraFormFieldCategoryPicker } from '../data/terra-form-field-category-picker';
import { TerraFormFieldInputFile } from '../data/terra-form-field-input-file';
import { TerraFormFieldColorPicker } from '../data/terra-form-field-color-picker';
import { TerraFormFieldMultiCheckBox } from '../data/terra-form-field-multi-check-box';
import { TerraFormFieldNoteEditor } from '../data/terra-form-field-note-editor';
import { TerraFormFieldCodeEditor } from '../data/terra-form-field-code-editor';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraJsonToFormFieldService {
  public static generateFormFields(formFieldsJSON: {
    [key: string]: any;
  }): Array<TerraFormFieldBase<any>> {
    let formFields: Array<TerraFormFieldBase<any>> = [];

    Object.keys(formFieldsJSON).forEach((formFieldKey: string): void => {
      formFields.push(this.createFormField(formFieldKey, formFieldsJSON[formFieldKey]));
    });

    return formFields;
  }

  private static createFormField(
    formFieldKey: string,
    formFieldData: { [key: string]: any }
  ): TerraFormFieldBase<any> {
    let formField: TerraFormFieldBase<any>;

    switch (formFieldData.type) {
      case TerraControlTypeEnum.INPUT_TEXT:
        formField = new TerraFormFieldInputText(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.INPUT_FILE:
        formField = new TerraFormFieldInputFile(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.INPUT_NUMBER:
        formField = new TerraFormFieldInputNumber(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.INPUT_DOUBLE:
        formField = new TerraFormFieldInputDouble(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.INPUT_TEXT_AREA:
        formField = new TerraFormFieldTextArea(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.DATE_PICKER:
        formField = new TerraFormFieldDatePicker(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.SELECT_BOX:
        formField = new TerraFormFieldSelectBox(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.CHECK_BOX:
        formField = new TerraFormFieldCheckBox(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.NOTE_EDITOR:
        formField = new TerraFormFieldNoteEditor(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.CODE_EDITOR:
        formField = new TerraFormFieldCodeEditor(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.CATEGORY_PICKER:
        formField = new TerraFormFieldCategoryPicker(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.COLOR_PICKER:
        formField = new TerraFormFieldColorPicker(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.MULTI_CHECK_BOX:
        formField = new TerraFormFieldMultiCheckBox(
          formFieldKey,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
      case TerraControlTypeEnum.VERTICAL_CONTAINER:
        formField = this.createContainerFormField(
          formFieldKey,
          formFieldData,
          TerraControlTypeEnum.VERTICAL_CONTAINER
        );
        break;
      case TerraControlTypeEnum.HORIZONTAL_CONTAINER:
        formField = this.createContainerFormField(
          formFieldKey,
          formFieldData,
          TerraControlTypeEnum.HORIZONTAL_CONTAINER
        );
        break;
      default:
        formField = new TerraFormFieldBase(
          formFieldKey,
          formFieldData.type,
          formFieldData.label,
          formFieldData.required,
          formFieldData.options
        );
        break;
    }

    return formField;
  }

  private static createContainerFormField(
    formFieldKey: string,
    formFieldData: { [key: string]: any },
    containerType: TerraControlTypeEnum
  ): TerraFormFieldBaseContainer {
    let containerFormField: TerraFormFieldBaseContainer = new TerraFormFieldBaseContainer(
      formFieldKey,
      containerType,
      formFieldData.label
    );

    containerFormField.containerEntries = this.generateFormFields(
      formFieldData.options.containerEntries
    );

    return containerFormField;
  }
}
