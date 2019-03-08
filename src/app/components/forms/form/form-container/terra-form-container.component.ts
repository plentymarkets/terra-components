import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    Type
} from '@angular/core';
import { TerraFormScope } from '../model/terra-form-scope.data';
import {
    isNullOrUndefined,
    isString
} from 'util';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraKeyValuePairInterface } from '../../../../models/terra-key-value-pair.interface';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraFormFieldHelper } from '../helper/terra-form-field.helper';

@Component({
    selector: 'terra-form-container',
    template: require('./terra-form-container.component.html'),
    styles:   [require('./terra-form-container.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraFormContainerComponent),
            multi:       true
        }
    ]
})
export class TerraFormContainerComponent implements OnInit, OnChanges, ControlValueAccessor
{
    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> } = {};

    @Input()
    public set inputFormFields(fields:{ [key:string]:TerraFormFieldInterface })
    {
        this.formFields = Object.keys(fields).map((key:string) =>
        {
            return {
                key:   key,
                value: fields[key]
            };
        });

        this.updateFieldVisibility();
    }

    @Input()
    public inputIsDisabled:boolean = false;

    @Input()
    public formKey:string;

    @Input()
    public inputFormGroup:FormGroup;

    @Output()
    public outputFormValueChanged:EventEmitter<TerraKeyValuePairInterface<any>> = new EventEmitter<TerraKeyValuePairInterface<any>>();

    public formGroup:FormGroup = new FormGroup({});

    protected formFields:Array<TerraKeyValuePairInterface<TerraFormFieldInterface>> = [];
    protected formFieldVisibility:{ [key:string]:boolean } = {};

    private onChangeCallback:(value:any) => void = (value:any):void => undefined;
    private onTouchedCallback:() => void = ():void => undefined;

    public ngOnInit():void
    {
        this.inputScope.onDataChanged.subscribe((data:any) =>
        {
            this.updateFieldVisibility();
        });

        this.formFields.forEach((test:TerraKeyValuePairInterface<TerraFormFieldInterface>) =>
        {
            this.formGroup.addControl(test.key, new FormControl('', TerraFormFieldHelper.generateValidators(test.value)));
        });

        if(this.inputFormGroup)
        {
            this.inputFormGroup.setControl(this.formKey, this.formGroup);
        }
        // this.formGroup.valueChanges.subscribe((value:any) => this.onChangeCallback(value));
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputScope'))
        {
            this.updateFieldVisibility();
        }
    }

    private updateFieldVisibility():void
    {
        this.formFields.forEach((field:TerraKeyValuePairInterface<TerraFormFieldInterface>) =>
        {
            if(isString(field.value.isVisible))
            {
                this.formFieldVisibility[field.key] = this.inputScope.evaluate(field.value.isVisible);
            }
            else
            {
                this.formFieldVisibility[field.key] = isNullOrUndefined(field.value.isVisible) || field.value.isVisible;
            }
        });
    }

    public registerOnChange(fn:(value:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled:boolean):void
    {
        // TODO
    }

    public writeValue(value:any):void
    {
        if(isNullOrUndefined(value))
        {
            this.formGroup.setValue({});
        }
        else
        {
            this.formGroup.patchValue(value);
        }
    }
}
