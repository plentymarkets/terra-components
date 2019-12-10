import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    Type
} from '@angular/core';
import { TerraFormScope } from '../model/terra-form-scope.data';
import {
    isNullOrUndefined,
    isString
} from 'util';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraKeyValuePairInterface } from '../../../../models';
import {
    AbstractControl,
    ControlValueAccessor,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { noop } from 'rxjs';
import { TerraFormTypeInterface } from '../model/terra-form-type.interface';
import { TerraFormFieldWidthEnum } from '../../dynamic-form/enum/terra-form-field-width.enum';

@Component({
    selector:  'terra-form-container',
    templateUrl: './terra-form-container.component.html',
    styleUrls: ['./terra-form-container.component.scss'],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: TerraFormContainerComponent,
            multi:       true
        }
    ]
})
export class TerraFormContainerComponent implements OnInit, OnChanges, ControlValueAccessor
{
    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> | TerraFormTypeInterface } = {};

    @Input()
    public set inputFormFields(fields:{ [key:string]:TerraFormFieldInterface })
    {
        this._formFields = Object.keys(fields).map((key:string) =>
        {
            return {
                key:   key,
                value: fields[key]
            };
        });

        this._updateFieldVisibility();
    }

    @Input()
    public width:25|50|75|100;

    /**
     * @description If true, the button will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled:boolean = false;

    @Input()
    public set inputFormGroup(formGroup:FormGroup)
    {
        this._formGroup = formGroup;
    }

    public _formGroup:FormGroup;

    public _formFields:Array<TerraKeyValuePairInterface<TerraFormFieldInterface>> = [];
    public _formFieldVisibility:{ [key:string]:boolean } = {};

    private _onChangeCallback:(value:any) => void = noop;
    private _onTouchedCallback:() => void = noop;

    public ngOnInit():void
    {
        this.inputScope.onDataChanged.subscribe(() =>
        {
            this._updateFieldVisibility();
        });
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputScope'))
        {
            this._updateFieldVisibility();
        }
    }

    public registerOnChange(fn:(value:any) => void):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this._onTouchedCallback = fn;
    }

    public writeValue(value:any):void
    {
        if(isNullOrUndefined(value))
        {
            this._formGroup.setValue({});
        }
        else
        {
            this._formGroup.patchValue(value);
        }
    }

    private _updateFieldVisibility():void
    {
        this._formFields.forEach((field:TerraKeyValuePairInterface<TerraFormFieldInterface>) =>
        {
            if(isString(field.value.isVisible))
            {
                this._formFieldVisibility[field.key] = this.inputScope.evaluate(field.value.isVisible as string);
            }
            else
            {
                this._formFieldVisibility[field.key] = isNullOrUndefined(field.value.isVisible) || field.value.isVisible;
            }

            if(!isNullOrUndefined(this._formGroup))
            {
                this._updateFormControlVisibility(field.key);
            }
        });
    }

    private _updateFormControlVisibility(fieldKey:string):void
    {
        let control:AbstractControl = this._formGroup.get(fieldKey);
        if(!isNullOrUndefined(control))
        {
            if(this._formFieldVisibility[fieldKey])
            {
                if(control.disabled)
                {
                    control.enable({onlySelf:true});
                }
            }
            else
            {
                if(control.enabled)
                {
                    control.disable({onlySelf:true});
                }
            }
        }
    }
}
