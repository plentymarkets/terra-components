import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Type
} from '@angular/core';
import { TerraDynamicFormScope } from '../model/terra-dynamic-form-scope.data';
import {
    isNullOrUndefined,
    isString
} from 'util';
import { TerraDynamicFormElementInterface } from '../model/terra-dynamic-form-element.interface';
import { TerraKeyValuePairInterface } from '../../../../models/terra-key-value-pair.interface';

@Component({
    selector: 'terra-dynamic-form2-container',
    template: require('./terra-dynamic-form2-container.component.html'),
    styles:   [require('./terra-dynamic-form2-container.component.scss')]
})
export class TerraDynamicForm2ContainerComponent implements OnInit
{
    @Input()
    public inputScope:TerraDynamicFormScope;

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
    public set inputFormFields(fields:{ [key:string]:TerraDynamicFormElementInterface })
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

    @Output()
    public outputFormValueChanged:EventEmitter<TerraKeyValuePairInterface<any>> = new EventEmitter<TerraKeyValuePairInterface<any>>();

    protected formFields:Array<TerraKeyValuePairInterface<TerraDynamicFormElementInterface>> = [];
    protected formFieldVisibility:{ [key:string]:boolean } = {};

    private value:any = {};

    public ngOnInit():void
    {
        this.inputScope.onDataChanged.subscribe((data:any) =>
        {
            this.updateFieldVisibility();
        });
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
            .forEach((field:TerraKeyValuePairInterface<TerraDynamicFormElementInterface>) =>
            {
                if(isString(field.value.visible))
                {
                    this.formFieldVisibility[field.key] = this.inputScope.evaluate(field.value.visible);
                }
                else
                {
                    this.formFieldVisibility[field.key] = isNullOrUndefined(field.value.visible) || field.value.visible;
                }
            });
    }
}
