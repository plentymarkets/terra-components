import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import {
    isFunction,
    isNullOrUndefined,
    isUndefined
} from 'util';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { TerraTextInputComponent } from '../../../../../';
import { TerraFormTypeInterface } from '../model/terra-form-type.interface';

@Component({
    selector: 'terra-form-entry',
    template: require('./terra-form-entry.component.html'),
    styles:   [require('./terra-form-entry.component.scss')]
})
export class TerraFormEntryComponent implements OnInit, AfterViewInit, OnChanges
{
    @Input()
    public inputFormField:TerraFormFieldInterface;

    @Input()
    public inputFormValue:any;

    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> | TerraFormTypeInterface } = {};

    @Input()
    public inputIsDisabled:boolean = false;

    @Output()
    public outputFormValueChanged:EventEmitter<any> = new EventEmitter<any>();

    protected containerClass:string;

    @ViewChild('formEntryContainer', {read: ViewContainerRef})
    private container:ViewContainerRef;

    private componentInstance:any;

    public constructor(private componentFactory:ComponentFactoryResolver)
    {
    }

    public ngOnInit():void
    {
        this.containerClass = 'form-entry-' + this.inputFormField.type;
    }

    public ngAfterViewInit():void
    {
        setTimeout(() =>
        {
            if(!isNullOrUndefined(this.container))
            {
                let controlType:Type<any> = TerraTextInputComponent;
                if(this.inputControlTypeMap.hasOwnProperty(this.inputFormField.type))
                {
                    if(this.inputControlTypeMap[this.inputFormField.type] instanceof Type)
                    {
                        controlType = <Type<any>> this.inputControlTypeMap[this.inputFormField.type];
                    }
                    else
                    {
                        controlType = (<TerraFormTypeInterface> this.inputControlTypeMap[this.inputFormField.type]).component;
                    }
                }

                let component:ComponentRef<any> = this.container.createComponent(
                    this.componentFactory.resolveComponentFactory(controlType)
                );

                this.componentInstance = component.instance;

                this.bindInputProperties();

                if(isFunction(this.componentInstance.registerOnChange) && isFunction(this.componentInstance.writeValue))
                {
                    if(isUndefined(this.inputFormValue) && !isNullOrUndefined(this.inputFormField.defaultValue))
                    {
                        this.onValueChanged(this.inputFormField.defaultValue);
                    }
                    this.componentInstance.registerOnChange((value:any):void =>
                    {
                        this.onValueChanged(value);
                    });
                    this.componentInstance.writeValue(this.inputFormValue);
                }
                else
                {
                    console.error(
                        'Cannot bind component ' + controlType.name + ' to dynamic form. ' +
                        'Bound components needs to implement the ControlValueAccessor interface.'
                    );
                }
            }
        });
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        this.bindInputProperties();
    }

    protected bindInputProperties():void
    {
        if(!isNullOrUndefined(this.componentInstance))
        {
            let inputMap:{ [key:string]:string } = {};
            if(!(this.inputControlTypeMap[this.inputFormField.type] instanceof Type))
            {
                inputMap = (<TerraFormTypeInterface> this.inputControlTypeMap[this.inputFormField.type]).inputMap;
            }

            if(!isNullOrUndefined(this.inputFormField.options))
            {
                Object.keys(this.inputFormField.options).forEach((optionKey:string) =>
                {
                    if(inputMap.hasOwnProperty(optionKey)
                       && Reflect.getMetadata('design:type', this.componentInstance.constructor.prototype, inputMap[optionKey]))
                    {
                        this.componentInstance[inputMap[optionKey]] = this.inputFormField.options[optionKey];
                    }
                    else if(Reflect.getMetadata('design:type', this.componentInstance.constructor.prototype, optionKey))
                    {
                        this.componentInstance[optionKey] = this.inputFormField.options[optionKey];
                    }
                    else
                    {
                        let prefixedOptionKey:string = this.transformInputPropertyName(optionKey);
                        if(Reflect.getMetadata('design:type', this.componentInstance.constructor.prototype, prefixedOptionKey))
                        {
                            this.componentInstance[prefixedOptionKey] = this.inputFormField.options[optionKey];
                        }
                        else
                        {
                            console.warn('Cannot assign property ' + optionKey + ' on ' + this.componentInstance.constructor.name );
                        }
                    }
                });
            }

            if(inputMap.hasOwnProperty('isDisabled'))
            {
                this.componentInstance[inputMap['isDisabled']] = this.inputIsDisabled;
            }
            else
            {
                this.componentInstance['inputIsDisabled'] = this.inputIsDisabled;
            }
        }
    }

    protected onValueChanged(value:any):void
    {
        if(value !== this.inputFormValue)
        {
            this.inputFormValue = value;
            this.outputFormValueChanged.next(value);
        }
    }

    protected onChildValueChanged(key:string, value:any):void
    {
        if(isNullOrUndefined(this.inputFormValue))
        {
            this.inputFormValue = {};
        }
        this.inputFormValue[key] = value;
        this.outputFormValueChanged.next(this.inputFormValue);
    }

    protected get hasChildren():boolean
    {
        return !isNullOrUndefined(this.inputFormField.children);
    }

    private transformInputPropertyName(propertyName:string):string
    {
        return 'input' + propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    }
}
