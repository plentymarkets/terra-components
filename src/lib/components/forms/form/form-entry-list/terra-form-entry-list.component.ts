import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Type } from '@angular/core';
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
import { Language } from 'angular-l10n';
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
export class TerraFormEntryListComponent implements OnInit, OnChanges, ControlValueAccessor, OnDestroy {
    @Input()
    public inputFormField: TerraFormFieldInterface;

    @Input()
    public inputFormFieldKey: string;

    @Input()
    public inputFormGroup: FormGroup;

    @Input()
    public inputScope: TerraFormScope;

    @Input()
    public inputControlTypeMap: { [key: string]: Type<unknown> } = {};

    @Input()
    public inputIsDisabled: boolean = false;

    @Input()
    public width: string;

    public formArray: FormArray;

    @Language()
    public _lang: string;

    public _childScopes: Array<TerraFormScope> = [];

    private _min: number;
    private _max: number;

    private _onChangeCallback: (value: unknown) => void = noop;
    private _onTouchedCallback: () => void = noop;

    public ngOnInit(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public ngOnDestroy(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inputFormGroup') || changes.hasOwnProperty('inputFormFieldKey')) {
            this.formArray = this.inputFormGroup.get(this.inputFormFieldKey) as FormArray;
            this._childScopes = this.formArray.controls.map((control: AbstractControl) => {
                return this.inputScope.createChildScope(this._createChildScopeData(control.value));
            });

            this.formArray.valueChanges.subscribe((values: Array<unknown>) => {
                values.forEach((value: unknown, index: number) => {
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

    public registerOnChange(fn: (value: unknown) => void): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    public writeValue(value: Array<unknown>): void {
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
            let defaultValue: unknown = isNullOrUndefined(this.inputFormField.defaultValue)
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

    private _onElementValueChanged(idx: number, value: unknown): void {
        // TODO: implement
        if (!isNullOrUndefined(this._childScopes[idx])) {
            this._childScopes[idx].data = this._createChildScopeData(value);
        } else {
            this._childScopes[idx] = this.inputScope.createChildScope(this._createChildScopeData(value));
        }
    }

    private _createChildScopeData(value: unknown): unknown {
        let loopKey: string = '$' + this.inputFormFieldKey;
        let childData: unknown = {};
        childData[loopKey] = value;

        return childData;
    }
}
