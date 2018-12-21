import {
    Component,
    forwardRef,
    Input,
    Type,
    ViewChild,
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
import { TerraFormContainerComponent } from './form-container/terra-form-container.component';

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
export class TerraFormComponent implements ControlValueAccessor
{
    @Input()
    public set inputFormFields(fields:{ [key:string]:TerraFormFieldInterface })
    {
        this.formFields = TerraFormFieldHelper.detectLegacyFormFields(fields);
    }

    public get inputFormFields():{ [key:string]:TerraFormFieldInterface }
    {
        if(isNullOrUndefined(this.formFields))
        {
            this.formFields = TerraFormFieldHelper.extractFormFields(this.values);
        }
        return this.formFields || {};
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
            return new TerraFormTypeMap();
        }
        return this.controlTypeMap;
    }

    @Input()
    public inputIsDisabled:boolean = false;

    @ViewChild(TerraFormContainerComponent)
    public rootContainer:TerraFormContainerComponent;

    protected scope:TerraFormScope = new TerraFormScope();

    protected values:any = {};

    protected controlTypeMap:{ [key:string]:Type<any> };

    private formFields:{ [key:string]:TerraFormFieldInterface };

    private parseFormField(field:TerraFormFieldInterface):any
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

    public get formGroup():FormGroup
    {
        return this.rootContainer.formGroup;
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
