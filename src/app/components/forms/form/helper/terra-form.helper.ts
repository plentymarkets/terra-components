import { TerraFormFieldInterface } from '../../../../..';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {
    isArray,
    isNullOrUndefined,
    isObject,
    isString
} from 'util';
import { StringHelper } from '../../../../helpers/string.helper';
import { TerraValidators } from '../../../../validators/validators';
import { TerraFormFieldHelper } from './terra-form-field.helper';

/**
 * @description This class provides functionality which may be used in relation to the <terra-form> and reactive forms.
 */
export class TerraFormHelper
{
    /**
     * @description Generates a list of validators based on the given formField's options that may be attached to a FormControl instance
     * @param formField
     */
    public static generateValidators(formField:TerraFormFieldInterface):Array<ValidatorFn>
    {
        let validators:Array<ValidatorFn> = [];

        if(isNullOrUndefined(formField.options))
        {
            return validators;
        }

        if(formField.options.required)
        {
            validators.push(Validators.required);
        }

        if(formField.options.minLength >= 0)
        {
            validators.push(Validators.minLength(formField.options.minLength));
        }

        if(formField.options.maxLength >= 0)
        {
            validators.push(Validators.maxLength(formField.options.maxLength));
        }

        if(!isNullOrUndefined(formField.options.minValue))
        {
            validators.push(Validators.min(formField.options.minValue));
        }

        if(!isNullOrUndefined(formField.options.maxValue))
        {
            validators.push(Validators.max(formField.options.maxValue));
        }

        if(!StringHelper.isNullUndefinedOrEmpty(formField.options.pattern) || formField.options.pattern instanceof RegExp)
        {
            validators.push(Validators.pattern(formField.options.pattern));
        }

        if(formField.options.email)
        {
            validators.push(Validators.email);
        }

        if(formField.options.isIban)
        {
            validators.push(TerraValidators.iban);
        }

        return validators;
    }

    /**
     * @description parses a set of formFields (TerraFormFieldInterface) and creates a representative FormGroup instance.
     * This FormGroup instance may be initialized by passing a set of values.
     * @param formFields
     * @param values
     */
    public static parseReactiveForm(formFields:{ [key:string]:TerraFormFieldInterface }, values?:{}):FormGroup
    {
        let controls:{ [key:string]:AbstractControl } = {};
        Object.keys(formFields).forEach((formFieldKey:string) =>
        {
            let formField:TerraFormFieldInterface = formFields[formFieldKey];
            if(formField.isList)
            {
                let formControls:Array<AbstractControl> = [];
                if(!isNullOrUndefined(values) && isArray(values))
                {
                    formControls = values.map((value:any) =>
                    {
                        return this.createNewControl(value || formField.defaultValue, formField);
                    });
                }
                if(isString(formField.isList))
                {
                    this.fitControlsToRange(formField, formControls);
                }
                controls[formFieldKey] = new FormArray(formControls);
            }
            else if(!isNullOrUndefined(formField.children))
            {
                let value:Object = !isNullOrUndefined(values) && isObject(values[formFieldKey]) ?
                    values[formFieldKey] : formField.defaultValue || null;
                controls[formFieldKey] = this.parseReactiveForm(formField.children, value);
            }
            else
            {
                let value:any = !isNullOrUndefined(values) ? values[formFieldKey] : formField.defaultValue;
                controls[formFieldKey] = new FormControl(value, this.generateValidators(formField));
            }
        });
        return new FormGroup(controls);
    }

    /**
     * @description scans the given form for FormArray instances recursively and adapts the amount of controls of those FormArrays to the
     *     amount of values that will be patched to them.
     * @param form
     * @param formFields
     * @param values
     */
    public static updateFormArrays(form:FormGroup, formFields:{ [key:string]:TerraFormFieldInterface }, values:any):void
    {
        if(form instanceof FormGroup && !isObject(values))
        {
            return;
        }

        Object.keys(form.controls).forEach((formControlKey:string) =>
        {
            let control:AbstractControl = form.get(formControlKey);
            let controlValues:any = values[formControlKey];
            let formField:TerraFormFieldInterface = formFields[formControlKey];

            if(formField.isList && control instanceof FormArray && isArray(controlValues))
            {
                let range:[number, number] = TerraFormFieldHelper.getListRange(formField.isList);
                let min:number = range[0];
                let max:number = range[1];
                while(control.length > Math.max(controlValues.length, min))
                {
                    control.removeAt(control.length - 1);
                }

                while(control.length < Math.min(controlValues.length, max))
                {
                    // silently push the new control. Do not use control.push() since it makes the valueChanges observable emit a value..
                    control.controls.push(this.createNewControl(controlValues[control.length], formField));
                }
            }
            else if(!isNullOrUndefined(formField.children) && control instanceof FormGroup && isObject(controlValues))
            {
                this.updateFormArrays(control, formField.children, controlValues);
            }
        });
    }

    /**
     * @description creates a new FormControl or FormGroup instance depending on whether the given formField has children or not.
     * The given value is used to initialize the control's value.
     * @param value
     * @param formField
     */
    public static createNewControl(value:any, formField:TerraFormFieldInterface):FormControl | FormGroup
    {
        if(!isNullOrUndefined(formField.children))
        {
            return this.parseReactiveForm(formField.children, value);
        }
        else
        {
            return new FormControl(value, this.generateValidators(formField));
        }
    }

    /**
     * @description Fits the given list of controls into the range of the given formField by adding/removing controls.
     * @param formField
     * @param controls
     */
    private static fitControlsToRange(formField:TerraFormFieldInterface, controls:Array<AbstractControl>):void
    {
        if(isNullOrUndefined(controls) || isNullOrUndefined(formField))
        {
            return;
        }

        let range:[number, number] = TerraFormFieldHelper.getListRange(formField.isList);
        let min:number = range[0];
        let max:number = range[1];

        while(!isNaN(min) && min > controls.length)
        {
            controls.push(this.createNewControl(formField.defaultValue, formField));
        }
        while(!isNaN(max) && max < controls.length)
        {
            controls.pop();
        }
    }
}
