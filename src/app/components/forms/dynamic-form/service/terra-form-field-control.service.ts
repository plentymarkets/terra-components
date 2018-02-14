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
import { TerraFormFieldBaseContainer } from '../data/terra-form-field-base-container';

/**
 * @author mfrank
 */
@Injectable()
export class TerraFormFieldControlService
{
    public dynamicFormGroup:FormGroup;
    public defaultValues:{ [key:string]:string | number | boolean };
    public translationMapping:{ [key:string]:string };

    private formFieldsToGroup:{ [key:string]:any };

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
        this.formFieldsToGroup = this.initFormGroupHelper(formFields, {}, false);
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
                                toGroup:{ [key:string]:any },
                                isDisabled:boolean = false):{ [key:string]:any }
    {
        formFields.forEach((formField:TerraFormFieldBase<any>) =>
        {
            if(formField instanceof TerraFormFieldBaseContainer && !isNullOrUndefined(formField.containerEntries))
            {
                toGroup[formField.key] = this._formBuilder.group(this.initFormGroupHelper(formField.containerEntries, {}, false));
            }
            else if(formField instanceof TerraFormFieldConditionalContainer && !isNullOrUndefined(formField.conditionalEntries))
            {
                // TODO extract into own component  or condition refactoring
                //let subGroup:{ [key:string]:any } = {};
                //
                //subGroup[formField.key] = new FormControl(formField.value, this.generateValidators(formField));
                //
                //this.defaultValues[formField.key] = formField.value;
                //
                //for(let key in formField.conditionalEntries)
                //{
                //    if(formField.conditionalEntries.hasOwnProperty(key))
                //    {
                //        subGroup[key] = this._formBuilder.group(this.initFormGroupHelper(formField.conditionalEntries[key], {}, true));
                //    }
                //}
                //
                //toGroup[formField.key] = this._formBuilder.group(subGroup);
            }
            else
            {
                toGroup[formField.key] = new FormControl(formField.value, this.generateValidators(formField));
                if(isDisabled)
                {
                    toGroup[formField.key].disable({
                        onlySelf:  true,
                        emitEvent: false
                    });
                }
                this.defaultValues[formField.key] = formField.value;
                this.translationMapping[formField.key] = formField.label;
            }
        });

        return toGroup;
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
