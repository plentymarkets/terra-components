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
import { TerraDynamicFormElementInterface } from '../model/terra-dynamic-form-element.interface';
import {
    isFunction,
    isNullOrUndefined
} from 'util';
import { TerraDynamicFormScope } from '../model/terra-dynamic-form-scope.data';
import { TerraTextInputComponent } from '../../../../../';
import { TerraDynamicFormTypeInterface } from '../model/terra-dynamic-form-type.interface';

@Component({
    selector: 'terra-dynamic-form2-entry',
    template: require('./terra-dynamic-form2-entry.component.html'),
    styles:   [require('./terra-dynamic-form2-entry.component.scss')]
})
export class TerraDynamicForm2EntryComponent implements OnInit, AfterViewInit, OnChanges
{
    @Input()
    public inputFormField:TerraDynamicFormElementInterface;

    @Input()
    public inputFormValue:any;

    @Input()
    public inputScope:TerraDynamicFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> | TerraDynamicFormTypeInterface } = {};

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
        if(isNullOrUndefined(this.inputFormValue))
        {
            this.inputFormValue = this.inputFormField.defaultValue || null;
        }
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
                    if ( this.inputControlTypeMap[this.inputFormField.type] instanceof Type )
                    {
                        controlType = <Type<any>> this.inputControlTypeMap[this.inputFormField.type];
                    }
                    else
                    {
                        controlType = (<TerraDynamicFormTypeInterface> this.inputControlTypeMap[this.inputFormField.type]).component;
                    }
                }

                let component:ComponentRef<any> = this.container.createComponent(
                    this.componentFactory.resolveComponentFactory(controlType)
                );

                this.componentInstance = component.instance;

                this.bindInputProperties();

                if(isFunction(this.componentInstance.onChangeCallback) && isFunction(this.componentInstance.writeValue))
                {
                    this.componentInstance.onChangeCallback = (value:any):void =>
                    {
                        this.onValueChanged(value);
                    };
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
        if ( !isNullOrUndefined(this.componentInstance) )
        {
            let inputMap:{[key:string]:string} = {};
            if ( !(this.inputControlTypeMap[this.inputFormField.type] instanceof Type) )
            {
                inputMap = (<TerraDynamicFormTypeInterface> this.inputControlTypeMap[this.inputFormField.type]).inputMap;
            }

            if(!isNullOrUndefined(this.inputFormField.options))
            {
                Object.keys(this.inputFormField.options).forEach((optionKey:string) =>
                {
                    if ( inputMap.hasOwnProperty(optionKey) )
                    {
                        this.componentInstance[inputMap[optionKey]] = this.inputFormField.options[optionKey];
                    }
                    else
                    {
                        this.componentInstance[this.transformInputPropertyName(optionKey)] = this.inputFormField.options[optionKey];
                    }
                });
            }

            if ( inputMap.hasOwnProperty('isDisabled') )
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
