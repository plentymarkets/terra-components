import 'reflect-metadata';
import { isArray, isFunction, isNullOrUndefined, isObject, isString } from 'util';
import { TerraFormFieldBaseContainer } from '../../dynamic-form/data/terra-form-field-base-container';
import { TerraFormFieldCodeEditorOptions } from '../../dynamic-form/data/terra-form-field-code-editor';
import { TerraFormFieldInputDouble } from '../../dynamic-form/data/terra-form-field-input-double';
import { TerraFormFieldInputFile } from '../../dynamic-form/data/terra-form-field-input-file';
import { TerraFormFieldMultiCheckBox } from '../../dynamic-form/data/terra-form-field-multi-check-box';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TERRA_FORM_PROPERTY_METADATA_KEY } from '../model/terra-form-property.decorator';
import { TerraFormFieldBase } from '../../dynamic-form/data/terra-form-field-base';
import { TerraJsonToFormFieldService } from '../../dynamic-form/service/terra-json-to-form-field.service';
import { TerraControlTypeEnum } from '../../dynamic-form/enum/terra-control-type.enum';
import { TerraFormFieldInputText } from '../../dynamic-form/data/terra-form-field-input-text';
import { TerraFormFieldSelectBox } from '../../dynamic-form/data/terra-form-field-select-box';
import { TerraKeyValueInterface } from '../../../../models';
import * as cloneDeep_ from 'lodash.clonedeep';

const cloneDeep: (val: Object) => Object = cloneDeep_;

export class TerraFormFieldHelper {
    private static readonly _legacyControlTypeMap: { [key: string]: string } = {
        checkBox: 'checkbox',
        conditionalContainer: 'vertical',
        datePicker: 'date',
        horizontalContainer: 'horizontal',
        inputFile: 'file',
        inputText: 'text',
        inputTextArea: 'textarea',
        inputNumber: 'number',
        inputDouble: 'double',
        selectBox: 'select',
        verticalContainer: 'vertical',
        categoryPicker: 'category',
        multiCheckBox: 'checkboxGroup',
        noteEditor: 'noteEditor',
        codeEditor: 'codeEditor'
    };

    public static extractFormFields(formModel: any): { [key: string]: TerraFormFieldInterface } {
        let formFields: { [key: string]: TerraFormFieldInterface } = Reflect.getMetadata(
            TERRA_FORM_PROPERTY_METADATA_KEY,
            formModel.constructor
        );

        if (!isNullOrUndefined(formFields)) {
            Object.keys(formFields).forEach((formFieldProperty: string) => {
                let formField: TerraFormFieldInterface = formFields[formFieldProperty];
                if (isNullOrUndefined(formField.isList)) {
                    formField.isList =
                        Reflect.getMetadata('design:type', formModel.constructor, formFieldProperty) === Array;
                }

                if (
                    !isNullOrUndefined(formModel[formFieldProperty]) &&
                    Reflect.hasMetadata(TERRA_FORM_PROPERTY_METADATA_KEY, formModel[formFieldProperty].constructor)
                ) {
                    formField.children = TerraFormFieldHelper.extractFormFields(formModel[formFieldProperty]);
                }
            });
        }
        return formFields;
    }

    public static injectOption(
        formFields: { [key: string]: TerraFormFieldInterface },
        type: string,
        optionKey: string,
        optionValue: any
    ): { [key: string]: TerraFormFieldInterface } {
        Object.keys(formFields).forEach((key: string) => {
            if (formFields[key].type === type) {
                formFields[key].options = formFields[key].options || {};
                formFields[key].options[optionKey] = optionValue;
            }
            if (!isNullOrUndefined(formFields[key].children)) {
                formFields[key].children = this.injectOption(formFields[key].children, type, optionKey, optionValue);
            }
        });

        return formFields;
    }

    public static isLegacyFormFields(formFields: { [key: string]: any } | Array<TerraFormFieldBase<any>>): boolean {
        return (
            isArray(formFields) ||
            Object.keys(formFields).some((key: string) => !isNullOrUndefined(formFields[key].label))
        );
    }

    public static detectLegacyFormFields(
        formFields: { [key: string]: any } | Array<TerraFormFieldBase<any>>
    ): { [key: string]: TerraFormFieldInterface } {
        if (isArray(formFields)) {
            let transformedFields: { [key: string]: TerraFormFieldInterface } = {};
            formFields.forEach((field: TerraFormFieldBase<any>) => {
                let transformedField: { key: string; field: TerraFormFieldInterface } = this._transformLegacyFormField(
                    field
                );
                transformedFields[transformedField.key] = transformedField.field;
            });
            return transformedFields;
        } else if (TerraFormFieldHelper.isLegacyFormFields(formFields)) {
            return this.detectLegacyFormFields(TerraJsonToFormFieldService.generateFormFields(formFields));
        }

        return <{ [key: string]: TerraFormFieldInterface }>formFields;
    }

    private static _transformLegacyFormField(
        field: TerraFormFieldBase<any>
    ): { key: string; field: TerraFormFieldInterface } {
        let result: { key: string; field: TerraFormFieldInterface } = {
            key: field.key,
            field: null
        };
        let type: string = this._legacyControlTypeMap[field.controlType];

        result.field = {
            type: type,
            options: {
                name: field.label,
                tooltip: field.tooltip,
                tooltipPlacement: field.tooltipPlacement,
                required: field.required
            }
        };

        let transformFn: string = 'transform' + type.charAt(0).toUpperCase() + type.substr(1) + 'Field';
        if (isFunction(this[transformFn])) {
            result.field = this[transformFn](result.field, field);
        }

        if (!!field.pattern) {
            result.field.isValid = field.pattern.toString();
        } else {
            let validators: Array<string> = [];
            if (field.minLength >= 0) {
                validators.push('this.length >= ' + field.minLength);
            }
            if (field.maxLength >= 0) {
                validators.push('this.length <= ' + field.maxLength);
            }
            if (!isNullOrUndefined(field.minValue)) {
                validators.push('this >= ' + field.minValue);
            }
            if (!isNullOrUndefined(field.maxValue)) {
                validators.push('this <= ' + field.maxValue);
            }
            result.field.isValid = validators.join(' && ');
        }

        if (
            field.controlType === TerraControlTypeEnum.CONDITIONAL_CONTAINER ||
            field.controlType === TerraControlTypeEnum.HORIZONTAL_CONTAINER ||
            field.controlType === TerraControlTypeEnum.VERTICAL_CONTAINER
        ) {
            result.field.children = this.detectLegacyFormFields((<TerraFormFieldBaseContainer>field).containerEntries);
        }

        return result;
    }

    private static _transformCodeEditorField(
        result: TerraFormFieldInterface,
        field: TerraFormFieldCodeEditorOptions
    ): TerraFormFieldInterface {
        result.options.fixedHeight = field.fixedHeight;
        return result;
    }

    private static _transformDoubleField(
        result: TerraFormFieldInterface,
        field: TerraFormFieldInputDouble
    ): TerraFormFieldInterface {
        result.options.isPrice = field.isPrice;
        result.options.decimalCount = field.decimalCount;
        return result;
    }

    private static _transformFileField(
        result: TerraFormFieldInterface,
        field: TerraFormFieldInputFile
    ): TerraFormFieldInterface {
        result.options.allowedExtensions = field.inputAllowedExtensions;
        return result;
    }

    private static _transformCheckboxGroupField(
        result: TerraFormFieldInterface,
        field: TerraFormFieldMultiCheckBox
    ): TerraFormFieldInterface {
        result.options.checkBoxValues = field.checkBoxValues;
        return result;
    }

    private static _transformTextField(
        result: TerraFormFieldInterface,
        field: TerraFormFieldInputText
    ): TerraFormFieldInterface {
        result.options.isPassword = field.isPassword;
        result.options.isIBAN = field.isIBAN;
        result.options.isReadOnly = field.isReadOnly;
        return result;
    }

    private static _transformSelectField(
        result: TerraFormFieldInterface,
        field: TerraFormFieldSelectBox
    ): TerraFormFieldInterface {
        result.options.listBoxValues = field.selectBoxValues;
        return result;
    }

    /**
     * @description Parses the upper and lower limit of form fields for a FormArray/FormEntryList based on a given string.
     * If no lower limit is given, 0 is returned. If no upper limit is given, Infinity is returned.
     * @param range
     */
    public static getListRange(range: boolean | string): [number, number] {
        let min: number;
        let max: number;

        if (isString(range)) {
            const match: RegExpExecArray = /^\s*\[\s*(\d*)\s*,\s*(\d*)\s*]\s*$/.exec(range as string);
            if (match !== null) {
                min = parseInt(match[1], 10);
                max = parseInt(match[2], 10);
            }
        }

        return [min || 0, max || Infinity];
    }

    /**
     * @description Determines the default value of a single #formField. Also considers children of a #formField if no defaultValue is
     *     given.
     * @param formField
     * @param skipList - optional parameter that skips the list check and returns the defaultValue of the single entry, not a list.
     */
    public static parseDefaultValue(formField: TerraFormFieldInterface, skipList: boolean = false): any {
        // check if a default value is given and can be returned
        if (!isNullOrUndefined(formField.defaultValue)) {
            if (
                (formField.isList && skipList && !Array.isArray(formField.defaultValue)) || // list should be skipped. Default value is not a list.
                (formField.isList && !skipList && Array.isArray(formField.defaultValue)) || // list expected. List given.
                (!formField.isList &&
                    !isNullOrUndefined(formField.children) &&
                    isObject(formField.defaultValue) &&
                    !Array.isArray(formField.defaultValue)) || // object expected. Object given. No Array!
                (!formField.isList && isNullOrUndefined(formField.children))
            ) {
                // anything else.. No further constraints given.
                return this._cloneDefaultValue(formField.defaultValue); // return the given default value - cloned if necessary
            }
        }

        // -> default value cannot be used. It violates the constraints above. Try to compose it out of other given information.
        // if a list was expected and a list may be returned, create a list.
        if (formField.isList && !skipList) {
            if (!isNullOrUndefined(formField.defaultValue)) {
                console.error(
                    `Since the formField's 'isList' property is set, a defaultValue of type array was expected.`,
                    formField.defaultValue,
                    `was given instead.`
                );
            }
            // create a list out of the default value of a single entry.
            const min: number = this.getListRange(formField.isList)[0];
            const defaultValue: any = this.parseDefaultValue(formField, true);

            return Array(min).fill(defaultValue);
        }

        // No list expected. Try to parse the children to compose a default value
        if (!isNullOrUndefined(formField.children)) {
            if (!isNullOrUndefined(formField.defaultValue)) {
                console.error(
                    `Since the formField has children, a defaultValue of type Object was expected.`,
                    formField.defaultValue,
                    `was given instead.`
                );
            }
            return this.parseDefaultValues(formField.children);
        }

        return null; // TODO: null as fallback??
    }

    /**
     * @description Determines the default values for a set of #formFields.
     * @param formFields
     */
    public static parseDefaultValues(formFields: TerraKeyValueInterface<TerraFormFieldInterface>): any {
        if (isNullOrUndefined(formFields)) {
            return;
        }
        let values: TerraKeyValueInterface<any> = {};
        Object.keys(formFields).forEach((formFieldKey: string) => {
            let formField: TerraFormFieldInterface = formFields[formFieldKey];
            values[formFieldKey] = this.parseDefaultValue(formField);
        });
        return values;
    }

    /**
     * Clone objects or arrays to prevent instance clash.
     * @param value to clone if isObject or isArray.
     */
    private static _cloneDefaultValue(value: any): any {
        if (isObject(value) || Array.isArray(value)) {
            return cloneDeep(value);
        }
        return value;
    }
}
