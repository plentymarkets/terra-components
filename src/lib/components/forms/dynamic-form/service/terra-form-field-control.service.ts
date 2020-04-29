import { Injectable } from '@angular/core';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { TerraFormFieldBaseContainer } from '../data/terra-form-field-base-container';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
@Injectable()
export class TerraFormFieldControlService {
    public dynamicFormGroup: FormGroup;
    public defaultValues: { [key: string]: string | number | boolean };
    public translationMapping: { [key: string]: string };

    private formFieldsToGroup: { [key: string]: any };

    constructor(private formBuilder: FormBuilder) {
        this.formFieldsToGroup = {};
        this.defaultValues = {};
        this.translationMapping = {};
    }

    /**
     * Creates a new FormGroup
     *
     * @param formFields
     */
    public createFormGroup(formFields: Array<TerraFormFieldBase<any>>): void {
        this.formFieldsToGroup = this.initFormGroupHelper(formFields, {}, false);
        this.dynamicFormGroup = this.formBuilder.group(this.formFieldsToGroup);
    }

    /**
     * Resets the form to default values
     */
    public resetForm(): void {
        this.dynamicFormGroup.reset(this.defaultValues);
    }

    /**
     * Resets the form to default values
     */
    public updateDefaultValues(values: any): void {
        this.defaultValues = values;
        this.dynamicFormGroup.patchValue(this.defaultValues, { emitEvent: true });
    }

    private initFormGroupHelper(
        formFields: Array<TerraFormFieldBase<any>>,
        toGroup: { [key: string]: any },
        isDisabled: boolean = false
    ): { [key: string]: any } {
        formFields.forEach((formField: TerraFormFieldBase<any>) => {
            if (formField instanceof TerraFormFieldBaseContainer && !isNullOrUndefined(formField.containerEntries)) {
                toGroup[formField.key] = this.formBuilder.group(
                    this.initFormGroupHelper(formField.containerEntries, {}, false)
                );
            } else {
                toGroup[formField.key] = new FormControl(formField.defaultValue, this.generateValidators(formField));
                if (isDisabled) {
                    toGroup[formField.key].disable({
                        onlySelf: true,
                        emitEvent: false
                    });
                }
                this.defaultValues[formField.key] = formField.defaultValue;
                this.translationMapping[formField.key] = formField.label;
            }
        });

        return toGroup;
    }

    private generateValidators(formField: TerraFormFieldBase<any>): Array<ValidatorFn> {
        let validators: Array<ValidatorFn> = [];

        if (formField.required) {
            validators.push(Validators.required);
        }

        if (formField.minLength >= 0) {
            validators.push(Validators.minLength(formField.minLength));
        }

        if (formField.maxLength >= 0) {
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

        if (formField.pattern !== '') {
            validators.push(Validators.pattern(formField.pattern));
        }

        return validators;
    }
}
