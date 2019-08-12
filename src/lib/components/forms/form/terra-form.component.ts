import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraFormScope } from './model/terra-form-scope.data';
import { TerraFormFieldInterface } from './model/terra-form-field.interface';
import { TerraFormTypeMap } from './model/terra-form-type-map.enum';
import { TerraFormFieldHelper } from './helper/terra-form-field.helper';
import { Data } from '@angular/router';
import { TerraFormFieldBase } from '../dynamic-form/data/terra-form-field-base';
import { TerraFormHelper } from './helper/terra-form.helper';
import { FormTypeMapInterface } from './model/form-type-map.interface';
import { FormTypeMap } from './model/form-type-map';
import {
    noop,
    Subscription
} from 'rxjs';
import { isNullOrUndefined } from '../../../helpers/null-checker';
@Component({
    selector:  'terra-form',
    template:  require('./terra-form.component.html'),
    styles:    [require('./terra-form.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraFormComponent),
            multi:       true
        }
    ]
})
export class TerraFormComponent implements ControlValueAccessor, OnChanges, OnInit
{
    /**
     * @description Set accessor for the form fields. Creates a representative reactive FormGroup instance by parsing the given form fields.
     * @param fields
     */
    @Input()
    public set inputFormFields(fields:{ [key:string]:TerraFormFieldInterface } | Array<TerraFormFieldBase<any>>)
    {
        if(!isNullOrUndefined(this.valueChangesSubscription))
        {
            this.valueChangesSubscription.unsubscribe();
        }
        this.formFields = TerraFormFieldHelper.detectLegacyFormFields(fields);
        this._formGroup = TerraFormHelper.parseReactiveForm(this.formFields, this.values);
        this.valueChangesSubscription = this._formGroup.valueChanges.subscribe((changes:Data) =>
        {
            Object.keys(changes).forEach((key:string) =>
            {
                this.values[key] = changes[key];
            });
            this.scope.data = this.values;
            this.onChangeCallback(this.values);
        });
    }

    /**
     * @description Get accessor for the form fields. Returns the previously set form fields.
     */
    public get inputFormFields():{ [key:string]:TerraFormFieldInterface } | Array<TerraFormFieldBase<any>>
    {
        if(isNullOrUndefined(this.formFields))
        {
            this.formFields = TerraFormFieldHelper.extractFormFields(this.values);
        }
        return this.formFields || {};
    }

    /**
     * @description A custom map of supported control types may be provided here.
     *     Please note: All of the control types contained in this map have to implement the ControlValueAccessor interface.
     * @default undefined - an instance of the TerraFormTypeMap will serve as fallback to support a default set of control types.
     */
    @Input()
    public inputControlTypeMap:FormTypeMapInterface | TerraFormTypeMap | FormTypeMap;

    /**
     * @description If true, disables the whole form - and all its containing controls/form fields.
     */
    @Input()
    public inputIsDisabled:boolean = false;

    /**
     * @description Scope of the form. It is used to evaluate the visibility of the form fields.
     * @readonly
     */
    public readonly scope:TerraFormScope = new TerraFormScope();

    protected controlTypeMap:FormTypeMapInterface | TerraFormTypeMap | FormTypeMap = {};

    private values:any = {};

    private formFields:{ [key:string]:TerraFormFieldInterface };
    private _formGroup:FormGroup = new FormGroup({});
    private valueChangesSubscription:Subscription;

    private onChangeCallback:(value:any) => void = noop;
    private onTouchedCallback:() => void = noop;

    /**
     * Implementation of the OnInit life cycle hook.
     * @description Initializes the controlTypeMap with its default value if `inputControlTypeMap` is not given.
     */
    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputControlTypeMap))
        {
            this.controlTypeMap = new TerraFormTypeMap();
        }
    }

    /**
     * Implementation of the OnChanges life cycle hook.
     * @description Updates the local controlTypeMap if a custom one is passed through the input `inputControlTypeMap`.
     * @param changes
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputControlTypeMap') && !isNullOrUndefined(this.inputControlTypeMap))
        {
            this.controlTypeMap = this.inputControlTypeMap;
        }
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface.
     * @description Patches the passed value to the underlying FormGroup instance, which updates the values of each affected form field.
     * If null or undefined is passed, the form is reset to default values.
     * @param values
     */
    public writeValue(values:any):void
    {
        if(isNullOrUndefined(values))
        {
            let defaultValues:any = TerraFormFieldHelper.parseDefaultValues(this.formFields);
            this.values = defaultValues;
            this.scope.data = defaultValues;
            this.formGroup.reset(defaultValues);
        }
        else if(this.scope.data !== values)
        {
            values = TerraFormHelper.updateFormArrays(this.formGroup, this.formFields, values);
            this.values = values;
            this.scope.data = values;
            this.formGroup.patchValue(values);
        }
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface.
     * @description Registers a given callback method, which will be called whenever a value of any form field/control changes.
     * @param callback
     */
    public registerOnChange(callback:(value:any) => void):void
    {
        this.onChangeCallback = callback;
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface.
     * @description Registers a given callback method, which will be called whenever the form is marked as touched.
     * This typically happens whenever a form control/field was focused and blurred.
     * @param callback
     */
    public registerOnTouched(callback:() => void):void
    {
        this.onTouchedCallback = callback;
    }

    /**
     * @description Get accessor for the reactive FormGroup instance that is created out of the given form fields.
     * Can be used for validation and value patching purposes.
     * @readonly
     */
    public get formGroup():FormGroup
    {
        return this._formGroup;
    }
}
