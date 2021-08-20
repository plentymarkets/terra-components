import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, Type } from '@angular/core';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { isNullOrUndefined } from 'util';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraKeyValueInterface, TerraKeyValuePairInterface } from '../../../../models';
import {
    AbstractControl,
    ControlValueAccessor,
    FormArray,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { noop } from 'rxjs';
import { TerraFormTypeInterface } from '../model/terra-form-type.interface';
import { TerraFormHelper } from '../helper/terra-form.helper';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { TerraFormFieldHelper } from '../helper/terra-form-field.helper';

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
    public sortByPosition: boolean = false;

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
            if (typeof field.value.isVisible === 'string') {
                this._formFieldVisibility[field.key] = this.inputScope?.evaluate(field.value.isVisible as string);
            } else {
                this._formFieldVisibility[field.key] =
                    isNullOrUndefined(field.value.isVisible) || field.value.isVisible;
            }

            if (!isNullOrUndefined(this._formGroup)) {
                this._updateFormControlVisibility(field.key);
            }
        });

        if (this.sortByPosition) {
            this._formFields.sort(
                (
                    a: TerraKeyValuePairInterface<TerraFormFieldInterface>,
                    b: TerraKeyValuePairInterface<TerraFormFieldInterface>
                ) => a.value.position - b.value.position
            );
        }
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

// Due to an import cycle between the `TerraFormContainerComponent` and `TerraFormEntryListComponent`
// which popped up during the library build with ivy, these two components have to be located in the same file.

// tslint:disable-next-line:max-classes-per-file
@Component({
    selector: 'terra-form-entry-list',
    templateUrl: './terra-form-entry-list.component.html',
    styleUrls: ['./terra-form-entry-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraFormEntryListComponent,
            multi: true
        }
    ]
})
export class TerraFormEntryListComponent implements OnChanges, ControlValueAccessor {
    @Input()
    public inputFormField: TerraFormFieldInterface;

    @Input()
    public inputFormFieldKey: string;

    @Input()
    public inputFormGroup: FormGroup;

    @Input()
    public inputScope: TerraFormScope;

    @Input()
    public inputControlTypeMap: { [key: string]: Type<any> } = {};

    @Input()
    public inputIsDisabled: boolean = false;

    @Input()
    public width: string;

    public formArray: FormArray;

    public _childScopes: Array<TerraFormScope> = [];

    private _min: number;
    private _max: number;

    private _onChangeCallback: (value: any) => void = noop;
    private _onTouchedCallback: () => void = noop;

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inputFormGroup') || changes.hasOwnProperty('inputFormFieldKey')) {
            this.formArray = this.inputFormGroup.get(this.inputFormFieldKey) as FormArray;
            this._childScopes = this.formArray.controls.map((control: AbstractControl) => {
                return this.inputScope.createChildScope(this._createChildScopeData(control.value));
            });

            this.formArray.valueChanges.subscribe((values: Array<any>) => {
                values.forEach((value: any, index: number) => {
                    this._onElementValueChanged(index, value);
                });
            });
        }

        if (changes.hasOwnProperty('inputFormField')) {
            let range: [number, number] = TerraFormFieldHelper.getListRange(this.inputFormField.isList);
            this._min = range[0];
            this._max = range[1];
        }
    }

    public registerOnChange(fn: (value: any) => void): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    public writeValue(value: Array<any>): void {
        if (isNullOrUndefined(value) || !Array.isArray(value)) {
            this.formArray = new FormArray([]);
            this.formArray.setValue([]);
            this._childScopes = [];
        } else {
            this.formArray.patchValue(value);

            this._childScopes = this.formArray.controls.map((control: FormControl) => {
                return this.inputScope.createChildScope(this._createChildScopeData(control.value));
            });
        }
    }

    public get _canAddElement(): boolean {
        return isNaN(this._max) || this.formArray.length < this._max;
    }

    public _addElement(): void {
        if (this._canAddElement) {
            let defaultValue: any = isNullOrUndefined(this.inputFormField.defaultValue)
                ? null
                : this.inputFormField.defaultValue;
            this._childScopes.push(this.inputScope.createChildScope(this._createChildScopeData(defaultValue)));
            this.formArray.push(
                TerraFormHelper.createNewControl(this.inputFormField.defaultValue, this.inputFormField)
            );
            this.formArray.markAsDirty();
        }
    }

    public get _canRemoveElement(): boolean {
        return isNaN(this._min) || this.formArray.length > this._min;
    }

    public _removeElement(index: number): void {
        if (index < 0 || index > this.formArray.length) {
            return;
        }

        if (this._canRemoveElement) {
            this._childScopes.splice(index, 1);
            this.formArray.removeAt(index);
            this.formArray.markAsDirty();
        }
    }

    public _moveElement(index: number, movement: number = 1): void {
        if (
            index >= 0 &&
            index < this.formArray.length &&
            index + movement >= 0 &&
            index + movement < this.formArray.length &&
            movement !== 0
        ) {
            const control: AbstractControl = this.formArray.at(index);
            const scope: TerraFormScope = this._childScopes[index];

            this.formArray.removeAt(index);
            this._childScopes.splice(index, 1);

            this.formArray.insert(index + movement, control);
            this._childScopes.splice(index + movement, 0, scope);
        }
    }

    private _onElementValueChanged(idx: number, value: any): void {
        // TODO: implement
        if (!isNullOrUndefined(this._childScopes[idx])) {
            this._childScopes[idx].data = this._createChildScopeData(value);
        } else {
            this._childScopes[idx] = this.inputScope.createChildScope(this._createChildScopeData(value));
        }
    }

    private _createChildScopeData(value: any): any {
        let loopKey: string = '$' + this.inputFormFieldKey;
        let childData: any = {};
        childData[loopKey] = value;

        return childData;
    }
}
