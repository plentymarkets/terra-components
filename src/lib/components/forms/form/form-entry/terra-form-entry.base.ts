import { isNullOrUndefined } from 'util';
import {
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnChanges,
    OnDestroy,
    Type,
    ViewChild
} from '@angular/core';
import { TerraFormTypeInterface } from '../model/terra-form-type.interface';
import { FormEntryContainerDirective } from './form-entry-container.directive';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraTextInputComponent } from '../../input/text-input/terra-text-input.component';

export class TerraFormEntryBase implements OnChanges, OnDestroy
{
    /**
     * @description Specification of the formField that should be displayed.
     */
    @Input()
    public inputFormField:TerraFormFieldInterface;

    /**
     * @description Map of supported control types. If the given formField's type is not supported, a TerraTextInputComponent instance is
     *     rendered by default.
     *     Please note: All of the control types contained in this map have to implement the ControlValueAccessor interface.
     * @default {} - an empty map. Hence, not a single control type is supported and the default type TerraTextInputComponent will be
     *     rendered as well.
     */
    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> | TerraFormTypeInterface } = {};

    /**
     * @description May be used to disable/enable the form field.
     * @default false
     */
    @Input()
    public inputIsDisabled:boolean = false;

    @ViewChild(FormEntryContainerDirective)
    protected container:FormEntryContainerDirective;

    protected componentFactory:ComponentFactory<any>;
    protected componentRef:ComponentRef<any>;
    protected get componentInstance():any
    {
        return (!this.componentRef) ? null : this.componentRef.instance;
    }

    constructor(protected componentFactoryResolver:ComponentFactoryResolver)
    {}

    /**
     * Implementation of the OnChanges life cycle hook.
     * @description Updates the input bindings of the dynamically created component instance.
     */
    public ngOnChanges():void
    {
        this.bindInputProperties();
    }

    /**
     * Implementation of the OnDestroy life cycle hook.
     * @description Destroys the component that has been created dynamically.
     */
    public ngOnDestroy():void
    {
        if(!isNullOrUndefined(this.componentRef))
        {
            this.componentRef.destroy();
        }
    }

    protected getControlType(fallback:Type<any> = TerraTextInputComponent):Type<any>
    {
        if(this.inputControlTypeMap.hasOwnProperty(this.inputFormField.type))
        {
            if(this.inputControlTypeMap[this.inputFormField.type] instanceof Type)
            {
                return <Type<any>> this.inputControlTypeMap[this.inputFormField.type];
            }
            else
            {
                return (<TerraFormTypeInterface> this.inputControlTypeMap[this.inputFormField.type]).component;
            }
        }

        return fallback;
    }

    protected initComponent(defaultControlType:Type<any> = TerraTextInputComponent, projectableNodes?:Array<Array<any>>):void
    {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            this.getControlType(defaultControlType)
        );
        this.componentRef = this.container.viewContainerRef.createComponent(this.componentFactory, undefined, undefined, projectableNodes);
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
                    this.performInputBindings(inputMap, optionKey);
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

    protected performInputBindings(inputMap:{ [key:string]:string }, optionKey:string):void
    {
        let inputPropertyNames:Array<string> = this.componentFactory
                                                   .inputs
                                                   .map((input:{ propName:string; templateName:string; }) => input.propName);
        if(inputMap.hasOwnProperty(optionKey) && inputPropertyNames.indexOf(inputMap[optionKey]) >= 0)
        {
            this.componentInstance[inputMap[optionKey]] = this.inputFormField.options[optionKey];
        }
        else if(inputPropertyNames.indexOf(optionKey) >= 0)
        {
            this.componentInstance[optionKey] = this.inputFormField.options[optionKey];
        }
        else
        {
            let prefixedOptionKey:string = this.transformInputPropertyName(optionKey);
            if(inputPropertyNames.indexOf(prefixedOptionKey) >= 0)
            {
                this.componentInstance[prefixedOptionKey] = this.inputFormField.options[optionKey];
            }
            else
            {
                console.warn('Cannot assign property ' + optionKey + ' on ' + this.componentInstance.constructor.name);
            }
        }
    }

    private transformInputPropertyName(propertyName:string):string
    {
        return 'input' + propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    }
}
