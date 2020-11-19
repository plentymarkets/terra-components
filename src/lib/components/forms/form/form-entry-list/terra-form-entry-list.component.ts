import { Component, Inject, Input, OnChanges, SimpleChanges, Type } from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { isArray, isNullOrUndefined } from 'util';
import { TerraFormScope } from '../model/terra-form-scope.data';
import {
    AbstractControl,
    ControlValueAccessor,
    FormArray,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { TerraFormFieldHelper } from '../helper/terra-form-field.helper';
import { TerraFormHelper } from '../helper/terra-form.helper';
import { noop } from 'rxjs';

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
        if (isNullOrUndefined(value) || !isArray(value)) {
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
