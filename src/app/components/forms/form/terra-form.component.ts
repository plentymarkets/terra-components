import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    SimpleChanges,
    Type,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { TerraFormScope } from './model/terra-form-scope.data';
import { TerraFormFieldInterface } from './model/terra-form-field.interface';
import { TerraFormTypeMap } from './model/terra-form-type-map.enum';
import { TerraFormFieldHelper } from './helper/terra-form-field.helper';
import { Data } from '@angular/router';
import { noop } from 'rxjs/util/noop';

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
export class TerraFormComponent implements ControlValueAccessor, OnChanges
{
    /**
     * @description Set accessor for the form fields. Creates a representative reactive FormGroup instance by parsing the given form fields.
     * @param fields
     */
    @Input()
    public set inputFormFields(fields:{ [key:string]:TerraFormFieldInterface })
    {
        this.formFields = TerraFormFieldHelper.detectLegacyFormFields(fields);
        this._formGroup = TerraFormFieldHelper.parseReactiveForm(fields, this.values);
        this._formGroup.valueChanges.subscribe((changes:Data) =>
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
    public get inputFormFields():{ [key:string]:TerraFormFieldInterface }
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
     * @default an instance of the TerraFormTypeMap
     */
    @Input()
    public inputControlTypeMap:any;

    /**
     * @description If true, disables the whole form - and all its containing controls/form fields
     */
    @Input()
    public inputIsDisabled:boolean = false;

    /**
     * @description Scope of the form. It is used to evaluate the visibility of the form fields.
     * @readonly
     */
    public readonly scope:TerraFormScope = new TerraFormScope();

    protected values:any = {};

    private controlTypeMap:{ [key:string]:Type<any> };

    private formFields:{ [key:string]:TerraFormFieldInterface };
    private _formGroup:FormGroup = new FormGroup({});

    private onChangeCallback:(value:any) => void = noop;
    private onTouchedCallback:() => void = noop;

    /**
     * Implementation of the OnChanges life cycle hook.
     * @description Updates the local controlTypeMap if a custom one is passed through the input `inputControlTypeMap`.
     * @param changes
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputControlTypeMap'))
        {
            this.controlTypeMap = this.inputControlTypeMap || new TerraFormTypeMap();
        }
    }

    private parseFormField(field:TerraFormFieldInterface):any
    {
        if(field.isList)
        {
            return field.defaultValue || [];
        }

        if(!isNullOrUndefined(field.children))
        {
            let result:any = {};
            Object.keys(field.children).forEach((fKey:string) =>
            {
                result[fKey] = this.parseFormField(field.children[fKey]);
            });
            return result;
        }
        return isNullOrUndefined(field.defaultValue) ? null : field.defaultValue;
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface.
     * @description Patches the passed value to the underlying FormGroup instance which updates the values of each affected form field.
     * @param values
     */
    public writeValue(values:any):void
    {
        if(isNullOrUndefined(values))
        {
            let defaultValues:any = {};
            Object.keys(this.inputFormFields).forEach((key:string) =>
            {
                defaultValues[key] = this.parseFormField(this.inputFormFields[key]);
            });
            this.values = defaultValues;
            this.scope.data = defaultValues;
            this.formGroup.reset(defaultValues);
        }
        else if(this.scope.data !== values)
        {
            this.values = values;
            this.scope.data = values;
            TerraFormFieldHelper.updateFormArrays(this.formGroup, this.formFields, values);
            this.formGroup.patchValue(values);
        }
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface.
     * @description Registers a given callback method which will be called whenever a value of any form field/control changes
     * @param callback
     */
    public registerOnChange(callback:(value:any) => void):void
    {
        this.onChangeCallback = callback;
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface.
     * @description Registers a given callback method which will be called whenever the form is marked as touched.
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
