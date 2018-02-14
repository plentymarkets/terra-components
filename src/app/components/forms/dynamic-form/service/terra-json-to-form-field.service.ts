import { Injectable } from '@angular/core';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
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

     private _formStructureJson:{ [key:string]:any } = {
     input: {
     type:     'inputText',
     label:    'Input',
     required: false,
     options:  {
     // common options
     tooltip:      'Tooooooltip',
     defaultValue: 'Hallo',
     }
     }
     };

     */

    public generateFormFields(formFieldsJSON:{ [key:string]:any }):Array<TerraFormFieldBase<any>>
    {
        // for(let key in formFieldsJSON)

        Object.keys(formFieldsJSON).forEach((formFieldKey:string):any =>
        {
            this.formFields.push(this.createFormField(formFieldKey, formFieldsJSON[formFieldKey]));
        });

        // formFieldsJSON.forEach((formFieldData:{ [key:string]:any }) => {
        //    this.formFields.push(this.createFormField(formFieldData));
        // });

        return this.formFields;
    }

    private createFormField(formFieldKey:string, formFieldData:{ [key:string]:any }):TerraFormFieldBase<any>
    {
        let formField:TerraFormFieldBase<any>;

        switch(formFieldData.type)
        {
            case TerraControlTypeEnum.INPUT_TEXT:
                formField = new TerraFormFieldInputText(formFieldKey, formFieldData.label, formFieldData.required, formFieldData.options);
                break;
            default:
                formField = new TerraFormFieldBase(formFieldKey, formFieldData.label, formFieldData.required, formFieldData.options);
                break;
        }

        return formField;
    }
}
