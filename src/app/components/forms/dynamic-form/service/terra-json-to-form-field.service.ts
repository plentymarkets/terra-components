import { Injectable } from '@angular/core';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/controlType.enum';
import { TerraFormFieldInputText } from '../data/terra-form-field-input-text';

/**
 * @author mfrank
 *
 *  EXPERIMENTAL - DO NOT USE THIS SERVICE
 */
@Injectable()
export class TerraJsonToFormFieldService
{
    public formFields:Array<TerraFormFieldBase<any>> = [];

    /*

    key
    controlType as enum value
    label
    validators

    selectBoxValues

     */

    public generateFormFields(formFieldsData:Array<{ [key:string]:any }>):Array<TerraFormFieldBase<any>>
    {
        formFieldsData.forEach((formFieldData:{ [key:string]:any }) => {
            this.formFields.push(this.createFormField(formFieldData));
        });

        return this.formFields;
    }

    private createFormField(formFieldData:{ [key:string]:any }):TerraFormFieldBase<any>
    {
        let formField:TerraFormFieldBase<any>;

        switch(formFieldData.controlType)
        {
            case TerraControlTypeEnum.INPUT_TEXT:
                formField = new TerraFormFieldInputText(formFieldData.key, {label: formFieldData.label});
                break;
            default:
                formField = new TerraFormFieldBase(formFieldData.key, formFieldData.controlType);
                break;
        }

        return formField;
    }
}
