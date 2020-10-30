import { Component, Input, OnChanges, OnInit, SimpleChanges, Type } from '@angular/core';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { isNullOrUndefined, isString } from 'util';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraKeyValueInterface, TerraKeyValuePairInterface } from '../../../../models';
import { AbstractControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { TerraFormTypeInterface } from '../model/terra-form-type.interface';
import { TerraFormHelper } from '../helper/terra-form.helper';

@Component({
    selector: 'terra-form-container',
    templateUrl: './terra-form-container.component.html',
    styleUrls: ['./terra-form-container.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraFormContainerComponent,
            multi: true
        }
    ]
})
export class TerraFormContainerComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input()
    public inputScope: TerraFormScope;

    @Input()
    public inputControlTypeMap: { [key: string]: Type<any> | TerraFormTypeInterface } = {};

    @Input()
    public set inputFormFields(fields: TerraKeyValueInterface<TerraFormFieldInterface>) {
        this._formFields = Object.keys(fields).map((key: string) => {
            return {
                key: key,
                value: fields[key]
            };
        });

        this._updateFieldVisibility();
    }

    /** @description Set width of terra-form-container. Sets width of all form elements that don't overwrite it. Default col-12. */
    @Input()
    public width: string = 'col-12';

    /**
     * @description If true, the button will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled: boolean = false;

    @Input()
    public set inputFormGroup(formGroup: FormGroup) {
        this._formGroup = formGroup;
    }

    /** @description Indicate whether this container should be displayed horizontally. */
    @Input()
    public horizontal: boolean = false;

    public _formGroup: FormGroup;

    public _formFields: Array<TerraKeyValuePairInterface<TerraFormFieldInterface>> = [];
    public _formFieldVisibility: TerraKeyValueInterface<boolean> = {};

    private _onChangeCallback: (value: any) => void = noop;
    private _onTouchedCallback: () => void = noop;

    public ngOnInit(): void {
        this.inputScope.onDataChanged.subscribe(() => {
            this._updateFieldVisibility();
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inputScope')) {
            this._updateFieldVisibility();
        }
    }

    public registerOnChange(fn: (value: any) => void): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    public writeValue(value: any): void {
        if (isNullOrUndefined(value)) {
            this._formGroup.setValue({});
        } else {
            this._formGroup.patchValue(value);
        }
    }

    private _updateFieldVisibility(): void {
        this._formFields.forEach((field: TerraKeyValuePairInterface<TerraFormFieldInterface>) => {
            if (isString(field.value.isVisible)) {
                this._formFieldVisibility[field.key] = this.inputScope?.evaluate(field.value.isVisible as string);
            } else {
                this._formFieldVisibility[field.key] =
                    isNullOrUndefined(field.value.isVisible) || field.value.isVisible;
            }

            if (!isNullOrUndefined(this._formGroup)) {
                this._updateFormControlVisibility(field.key);
            }
        });
    }

    private _updateFormControlVisibility(fieldKey: string): void {
        let control: AbstractControl = this._formGroup.get(fieldKey);
        if (!isNullOrUndefined(control)) {
            if (this._formFieldVisibility[fieldKey]) {
                if (!control.validator) {
                    const formField: TerraKeyValuePairInterface<TerraFormFieldInterface> = this._formFields.find(
                        (field: TerraKeyValuePairInterface<TerraFormFieldInterface>) => field.key === fieldKey
                    );
                    control.setValidators(TerraFormHelper.generateValidators(formField.value));
                }
            } else {
                if (control.validator) {
                    control.clearValidators();
                    // update the control's validity when the current change detection cycle is over
                    setTimeout(() => control.updateValueAndValidity());
                }
            }
        }
    }
}
