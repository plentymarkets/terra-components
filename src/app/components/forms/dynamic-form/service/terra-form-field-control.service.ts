import { Injectable } from '@angular/core';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { TerraFormFieldHorizontalContainer } from '../data/terra-form-field-horizontal-container';
import { TerraFormFieldConditionalContainer } from '../data/terra-form-field-conditional-container';

/**
 * @author mfrank
 */
@Injectable()
export class TerraFormFieldControlService
{
    public dynamicFormGroup:FormGroup;
    public defaultValues:{ [key:string]:string | number | boolean };
    public translationMapping:{ [key:string]:string };

    private formFieldsToGroup:{ [key:string]:FormControl };

    constructor(private _formBuilder:FormBuilder)
    {
        this.formFieldsToGroup = {};
        this.defaultValues = {};
        this.translationMapping = {};
    }

    /**
     * Creates a new FormGroup
     *
     * @param formFields
     */
    public createFormGroup(formFields:Array<TerraFormFieldBase<any>>):void
    {
        this.initFormGroupHelper(formFields, false);
        this.dynamicFormGroup = this._formBuilder.group(this.formFieldsToGroup);
    }

    /**
     * Resets the form to default values
     */
    public resetForm():void
    {
        this.dynamicFormGroup.reset(this.defaultValues);
    }

    private initFormGroupHelper(formFields:Array<TerraFormFieldBase<any>>,
                                isDisabled:boolean = false):void
    {
        formFields.forEach((formField:TerraFormFieldBase<any>) =>
        {
            if(formField instanceof TerraFormFieldHorizontalContainer && !isNullOrUndefined(formField.containerEntries))
            {
                this.initFormGroupHelper(formField.containerEntries, false);
            }
            else if(formField instanceof TerraFormFieldConditionalContainer && !isNullOrUndefined(formField.conditionalEntries))
            {
                this.formFieldsToGroup[formField.key] = new FormControl(formField.value, null);

                for(let key in formField.conditionalEntries)
                {
                    if(formField.conditionalEntries.hasOwnProperty(key))
                    {
                        this.initFormGroupHelper(formField.conditionalEntries[key], true);
                    }
                }
            }
            else
            {
                this.formFieldsToGroup[formField.key] = new FormControl(formField.value, this.generateValidators(formField));
                if(isDisabled)
                {
                    this.formFieldsToGroup[formField.key].disable({
                        onlySelf:  true,
                        emitEvent: false
                    });
                }
                this.defaultValues[formField.key] = formField.value;
                this.translationMapping[formField.key] = formField.label;
            }
        });
    }

    private generateValidators(formField:TerraFormFieldBase<any>):Array<ValidatorFn>
    {
        let validators:Array<ValidatorFn> = [];

        if(formField.required)
        {
            validators.push(Validators.required);
        }

        if(formField.minLength >= 0)
        {
            validators.push(Validators.minLength(formField.minLength));
        }

        if(formField.maxLength >= 0)
        {
            validators.push(Validators.maxLength(formField.maxLength));
        }

        // TODO implement, if Angular version is or higher 4.4
        // if(!isNull(formField.minValue))
        // {
        //    validators.push(Validators.minValue(formField.minValue));
        // }
        //
        // if(!isNull(formField.maxValue))
        // {
        //    validators.push(Validators.maxValue(formField.maxValue));
        // }

        if(formField.pattern !== '')
        {
            validators.push(Validators.pattern(formField.pattern));
        }

        return validators;
    }
}
