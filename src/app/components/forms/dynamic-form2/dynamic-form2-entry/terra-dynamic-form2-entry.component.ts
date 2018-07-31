import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
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
import { ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'terra-dynamic-form2-entry',
    template: require('./terra-dynamic-form2-entry.component.html'),
    styles:   [require('./terra-dynamic-form2-entry.component.scss')]
})
export class TerraDynamicForm2EntryComponent implements OnInit, AfterViewInit
{
    @Input()
    public inputFormField:TerraDynamicFormElementInterface;

    @Input()
    public inputFormValue:any;

    @Input()
    public inputScope:TerraDynamicFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> } = {};

    @Output()
    public outputFormValueChanged:EventEmitter<any> = new EventEmitter<any>();

    protected containerClass:string;

    @ViewChild('formEntryContainer', {read: ViewContainerRef})
    private container:ViewContainerRef;

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
                    controlType = this.inputControlTypeMap[this.inputFormField.type];
                }

                let component:ComponentRef<any> = this.container.createComponent(
                    this.componentFactory.resolveComponentFactory(controlType)
                );

                let componentInstance:any = component.instance;

                if(!isNullOrUndefined(this.inputFormField.options))
                {
                    Object.keys(this.inputFormField.options).forEach((optionKey:string) =>
                    {
                        componentInstance[this.transformInputPropertyName(optionKey)] = this.inputFormField.options[optionKey];
                    });

                }

                if(isFunction(componentInstance.onChangeCallback) && isFunction(componentInstance.writeValue))
                {
                    componentInstance.onChangeCallback = (value:any):void =>
                    {
                        this.onValueChanged(value);
                    };
                    componentInstance.writeValue(this.inputFormValue);
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
