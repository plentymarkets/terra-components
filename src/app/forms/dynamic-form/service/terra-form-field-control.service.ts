import { Injectable } from '@angular/core';
import { TerraFormFieldBaseBean } from '../data/terra-form-field-base.bean';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { TerraFormGroupHelper } from '../data/terra-form-group-helper';

/**
 * @author mfrank
 */
@Injectable()
export class TerraFormFieldControlService
{
    constructor(private _formBuilder:FormBuilder)
    {}

    public initFormGroupHelper(formFields:Array<TerraFormFieldBaseBean<any>>,
                               formGroupHelper:TerraFormGroupHelper = new TerraFormGroupHelper(),
                               isDisabled:boolean = false):TerraFormGroupHelper
    {
        formFields.forEach((formField:TerraFormFieldBaseBean<any>) =>
        {
            if(formField.controlType === 'horizontalContainer' && !isNullOrUndefined(formField.containerEntries))
            {
                this.initFormGroupHelper(formField.containerEntries, formGroupHelper, false);
            }
            else if(formField.controlType === 'conditionalContainer' && !isNullOrUndefined(formField.conditionalEntries))
            {
                formGroupHelper.formFieldsToGroup[formField.key] = new FormControl(formField.defaultValue, null);

                for(let key in formField.conditionalEntries)
                {
                    if(formField.conditionalEntries.hasOwnProperty(key))
                    {
                        this.initFormGroupHelper(formField.conditionalEntries[key], formGroupHelper,  true);
                    }
                }
            }
            else
            {
                formGroupHelper.formFieldsToGroup[formField.key] = new FormControl(formField.value, this.generateValidators(formField));
                if(isDisabled)
                {
                    formGroupHelper.formFieldsToGroup[formField.key].disable({onlySelf: true, emitEvent: false});
                }
                formGroupHelper.defaultValues[formField.key] = formField.value;
                formGroupHelper.translationMapping[formField.key] = formField.label;
            }
        });

        return formGroupHelper;
    }

    public createFormGroup(formGroupHelper:TerraFormGroupHelper):FormGroup
    {
        return this._formBuilder.group(formGroupHelper.formFieldsToGroup);
    }

    private generateValidators(formField:TerraFormFieldBaseBean<any>):Array<ValidatorFn>
    {
        let validators:Array<ValidatorFn> = [];

        if(formField.required)
        {
            validators.push(Validators.required);
        }

        // TODO add more validators

        return validators;
    }
}