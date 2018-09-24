import {
    Component,
    EventEmitter,
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

@Component({
    selector: 'terra-form-container',
    template: require('./terra-form-container.component.html'),
    styles:   [require('./terra-form-container.component.scss')]
})
export class TerraFormContainerComponent implements OnInit, OnChanges
{
    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> } = {};

    @Input()
    public set inputValue(value:any)
    {
        if(isNullOrUndefined(value))
        {
            this.value = {};
        }
        else
        {
            this.value = value;
        }
    }

    public get inputValue():any
    {
        return this.value;
    }

    @Input()
    public set inputFormFields(fields:{ [key:string]:TerraFormFieldInterface })
    {
        this.formFields = Object.keys(fields)
                                .map((key:string) =>
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

    @Output()
    public outputFormValueChanged:EventEmitter<TerraKeyValuePairInterface<any>> = new EventEmitter<TerraKeyValuePairInterface<any>>();

    protected formFields:Array<TerraKeyValuePairInterface<TerraFormFieldInterface>> = [];
    protected formFieldVisibility:{ [key:string]:boolean } = {};

    private value:any = {};

    public ngOnInit():void
    {
        this.inputScope.onDataChanged.subscribe((data:any) =>
        {
            this.updateFieldVisibility();
        });
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputScope'))
        {
            this.updateFieldVisibility();
        }
    }

    protected onFormValueChanged(key:string, value:any):void
    {
        this.value[key] = value;
        this.updateFieldVisibility();
        this.outputFormValueChanged.next({
            key:   key,
            value: value
        });
    }

    private updateFieldVisibility():void
    {
        this.formFields
            .forEach((field:TerraKeyValuePairInterface<TerraFormFieldInterface>) =>
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
}
