import {
    Component,
    forwardRef,
    Input,
    Type,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { TerraDynamicFormScope } from './model/terra-dynamic-form-scope.data';
import { TerraDynamicFormElementInterface } from './model/terra-dynamic-form-element.interface';
import { TerraDynamicFormTypeMap } from './model/terra-dynamic-form-type-map.enum';
import { TerraFormFieldHelper } from './helper/terra-form-field.helper';

@Component({
    selector:  'terra-dynamic-form2',
    template:  require('./terra-dynamic-form2.component.html'),
    styles:    [require('./terra-dynamic-form2.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraDynamicForm2Component),
            multi:       true
        }
    ]
})
export class TerraDynamicForm2Component implements ControlValueAccessor
{
    @Input()
    public set inputFormFields(fields:{ [key:string]:TerraDynamicFormElementInterface })
    {
        this._formFields = fields;
    }

    public get inputFormFields():{ [key:string]:TerraDynamicFormElementInterface }
    {
        if(isNullOrUndefined(this._formFields))
        {
            this._formFields = TerraFormFieldHelper.extractFormFields(this.values);
        }
        return this._formFields || {};
    }

    @Input()
    public set inputControlTypeMap(map:any)
    {
        this.controlTypeMap = map;
    }

    public get inputControlTypeMap():any
    {
        if(isNullOrUndefined(this.controlTypeMap))
        {
            return TerraDynamicFormTypeMap;
        }
        return this.controlTypeMap;
    }

    protected scope:TerraDynamicFormScope = new TerraDynamicFormScope();

    protected values:any = {};

    protected controlTypeMap:{ [key:string]:Type<any> };

    private _formFields:{ [key:string]:TerraDynamicFormElementInterface };

    private parseFormField(field:TerraDynamicFormElementInterface):any
    {
        if(!isNullOrUndefined(field.children))
        {
            let result:any = {};
            Object.keys(field.children)
                  .forEach((fKey:string) =>
                  {
                      result[fKey] = this.parseFormField(field.children[fKey]);
                  });
            return result;
        }
        return field.defaultValue || null;
    }

    public writeValue(values:any):void
    {
        if(isNullOrUndefined(values))
        {
            let defaultValues:any = {};
            Object.keys(this.inputFormFields)
                  .forEach((key:string) =>
                  {
                      defaultValues[key] = this.parseFormField(this.inputFormFields[key]);
                  });
            this.values = defaultValues;
            this.scope.data = defaultValues;
        }
        else if(this.scope.data !== values)
        {
            this.values = values;
            this.scope.data = values;
        }
    }

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;

    public registerOnChange(callback:any):void
    {
        this.onChangeCallback = callback;
    }

    private onTouchedCallback:() => void = ():void => undefined;

    public registerOnTouched(callback:any):void
    {
        this.onTouchedCallback = callback;
    }

    protected onValueChanged(key:string, value:any):void
    {
        this.values[key] = value;
        this.scope.data[key] = value;
        this.scope.onDataChanged.next(this.scope.data);
        this.onChangeCallback(this.values);
    }

}
