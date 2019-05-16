import 'reflect-metadata';
import {
    isArray,
    isFunction,
    isNullOrUndefined,
    isObject,
    isString
} from 'util';
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
import * as _ from 'lodash';

export class TerraFormFieldHelper
{
    private static readonly legacyControlTypeMap:{ [key:string]:string } = {
        checkBox:             'checkbox',
        conditionalContainer: 'vertical',
        datePicker:           'date',
        horizontalContainer:  'horizontal',
        inputFile:            'file',
        inputText:            'text',
        inputTextArea:        'textarea',
        inputNumber:          'number',
        inputDouble:          'double',
        selectBox:            'select',
        verticalContainer:    'vertical',
        categoryPicker:       'category',
        multiCheckBox:        'checkboxGroup',
        noteEditor:           'noteEditor',
        codeEditor:           'codeEditor'
    };

    public static extractFormFields(formModel:any):{ [key:string]:TerraFormFieldInterface }
    {
        let formFields:{ [key:string]:TerraFormFieldInterface }
            = Reflect.getMetadata(TERRA_FORM_PROPERTY_METADATA_KEY, formModel.constructor);

        if(!isNullOrUndefined(formFields))
        {
            Object.keys(formFields)
                  .forEach((formFieldProperty:string) =>
                  {
                      let formField:TerraFormFieldInterface = formFields[formFieldProperty];
                      if(isNullOrUndefined(formField.isList))
                      {
                          formField.isList = Reflect.getMetadata('design:type', formModel.constructor, formFieldProperty) === Array;
                      }

                      if(!isNullOrUndefined(formModel[formFieldProperty])
                         && Reflect.hasMetadata(TERRA_FORM_PROPERTY_METADATA_KEY, formModel[formFieldProperty].constructor))
                      {
                          formField.children = TerraFormFieldHelper.extractFormFields(formModel[formFieldProperty]);
                      }
                  });
        }
        return formFields;
    }

    public static injectOption(formFields:{ [key:string]:TerraFormFieldInterface },
                               type:string,
                               optionKey:string,
                               optionValue:any):{ [key:string]:TerraFormFieldInterface }
    {
        Object.keys(formFields).forEach((key:string) =>
        {
            if(formFields[key].type === type)
            {
                formFields[key].options = formFields[key].options || {};
                formFields[key].options[optionKey] = optionValue;
            }
            if(!isNullOrUndefined(formFields[key].children))
            {
                formFields[key].children = this.injectOption(formFields[key].children, type, optionKey, optionValue);
            }
        });

        return formFields;
    }

    public static isLegacyFormFields(formFields:{ [key:string]:any } | Array<TerraFormFieldBase<any>>):boolean
    {
        return isArray(formFields) || Object.keys(formFields).some((key:string) => !isNullOrUndefined(formFields[key].label));
    }

    public static detectLegacyFormFields(formFields:{ [key:string]:any } | Array<TerraFormFieldBase<any>>):{ [key:string]:TerraFormFieldInterface }
    {
        if(isArray(formFields))
        {
            let transformedFields:{ [key:string]:TerraFormFieldInterface } = {};
            formFields.forEach((field:TerraFormFieldBase<any>) =>
            {
                let transformedField:{ key:string, field:TerraFormFieldInterface } = this.transformLegacyFormField(field);
                transformedFields[transformedField.key] = transformedField.field;
            });
            return transformedFields;
        }
        else if(TerraFormFieldHelper.isLegacyFormFields(formFields))
        {
            return this.detectLegacyFormFields(
                TerraJsonToFormFieldService.generateFormFields(formFields)
            );
        }

        return <{ [key:string]:TerraFormFieldInterface }> formFields;
    }

    private static transformLegacyFormField(field:TerraFormFieldBase<any>):{ key:string, field:TerraFormFieldInterface }
    {
        let result:{ key:string, field:TerraFormFieldInterface } = {
            key:   field.key,
            field: null
        };
        let type:string = this.legacyControlTypeMap[field.controlType];

        result.field = {
            type:    type,
            options: {
                name:             field.label,
                tooltip:          field.tooltip,
                tooltipPlacement: field.tooltipPlacement,
                required:         field.required
            }
        };

        let transformFn:string = 'transform' + type.charAt(0).toUpperCase() + type.substr(1) + 'Field';
        if(isFunction(this[transformFn]))
        {
            result.field = this[transformFn](result.field, field);
        }

        if(!!field.pattern)
        {
            result.field.isValid = field.pattern.toString();
        }
        else
        {
            let validators:Array<string> = [];
            if(field.minLength >= 0)
            {
                validators.push('this.length >= ' + field.minLength);
            }
            if(field.maxLength >= 0)
            {
                validators.push('this.length <= ' + field.maxLength);
            }
            if(!isNullOrUndefined(field.minValue))
            {
                validators.push('this >= ' + field.minValue);
            }
            if(!isNullOrUndefined(field.maxValue))
            {
                validators.push('this <= ' + field.maxValue);
            }
            result.field.isValid = validators.join(' && ');
        }

        if(field.controlType === TerraControlTypeEnum.CONDITIONAL_CONTAINER
           || field.controlType === TerraControlTypeEnum.HORIZONTAL_CONTAINER
           || field.controlType === TerraControlTypeEnum.VERTICAL_CONTAINER)
        {
            result.field.children = this.detectLegacyFormFields(
                (<TerraFormFieldBaseContainer> field).containerEntries
            );
        }

        return result;
    }

    private static transformCodeEditorField(result:TerraFormFieldInterface,
                                            field:TerraFormFieldCodeEditorOptions):TerraFormFieldInterface
    {
        result.options.fixedHeight = field.fixedHeight;
        return result;
    }

    private static transformDoubleField(result:TerraFormFieldInterface,
                                        field:TerraFormFieldInputDouble):TerraFormFieldInterface
    {
        result.options.isPrice = field.isPrice;
        result.options.decimalCount = field.decimalCount;
        return result;
    }

    private static transformFileField(result:TerraFormFieldInterface,
                                      field:TerraFormFieldInputFile):TerraFormFieldInterface
    {
        result.options.allowedExtensions = field.inputAllowedExtensions;
        return result;
    }

    private static transformCheckboxGroupField(result:TerraFormFieldInterface,
                                               field:TerraFormFieldMultiCheckBox):TerraFormFieldInterface
    {
        result.options.checkBoxValues = field.checkBoxValues;
        return result;
    }

    private static transformTextField(result:TerraFormFieldInterface,
                                      field:TerraFormFieldInputText):TerraFormFieldInterface
    {
        result.options.isPassword = field.isPassword;
        result.options.isIBAN = field.isIBAN;
        result.options.isReadOnly = field.isReadOnly;
        return result;
    }

    private static transformSelectField(result:TerraFormFieldInterface,
                                        field:TerraFormFieldSelectBox):TerraFormFieldInterface
    {
        result.options.listBoxValues = field.selectBoxValues;
        return result;
    }

    /**
     * @description Parses the upper and lower limit of form fields for a FormArray/FormEntryList based on a given string.
     * If no lower limit is given, 0 is returned. If no upper limit is given, Infinity is returned.
     * @param range
     */
    public static getListRange(range:boolean | string):[number, number]
    {
        let min:number;
        let max:number;

        if(isString(range))
        {
            let match:RegExpExecArray = /^\[(\d*),(\d*)]$/.exec(range);
            if(match !== null)
            {
                min = parseInt(match[1], 10);
                max = parseInt(match[2], 10);
            }
        }

        return [min || 0, max || Infinity];
    }

    /**
     * Recursively parses the defaultValue of a formField and it's children.
     * @param field
     */
    public static parseDefaultValue(field:TerraFormFieldInterface):any
    {
        if(field.isList)
        {
            return this.cloneDefaultValue(field.defaultValue) || [];
        }

        if(!isNullOrUndefined(field.children))
        {
            let result:any = {};
            Object.keys(field.children).forEach((fKey:string) =>
            {
                result[fKey] = this.parseDefaultValue(field.children[fKey]);
            });
            return result;
        }
        return isNullOrUndefined(field.defaultValue) ? null : this.cloneDefaultValue(field.defaultValue);
    }

    /**
     * Clone objects or arrays to prevent instance clash.
     * @param value to clone if isObject or isArray.
     */
    private static cloneDefaultValue(value:any):any
    {
        if(isObject(value) || isArray(value))
        {
            return _.cloneDeep((value));
        }
        return value;
    }
}
