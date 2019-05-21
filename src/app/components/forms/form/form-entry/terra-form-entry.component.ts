import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    Type,
    ViewChild
} from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import {
    isFunction,
    isNullOrUndefined
} from 'util';
import { TerraFormTypeInterface } from '../model/terra-form-type.interface';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraTextInputComponent } from '../../input/text-input/terra-text-input.component';
import { FormEntryContainerDirective } from './form-entry-container.directive';
import { noop } from 'rxjs/util/noop';
import { TerraKeyValueInterface } from '../../../../models/terra-key-value.interface';
import { Subscription } from 'rxjs';
import { TerraInfoComponent } from '../../../../..';
import { TestComponent } from './terra-form-entry.component.spec';

@Component({
    selector:  'terra-form-entry',
    template:  require('./terra-form-entry.component.html'),
    styles:    [require('./terra-form-entry.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraFormEntryComponent),
            multi:       true
        }
    ]
})
export class TerraFormEntryComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor
{
    /**
     * @description Specification of the formField that should be displayed.
     */
    @Input()
    public inputFormField:TerraFormFieldInterface;

    /**
     * @description FormControl instance corresponding to the given formField.
     */
    @Input()
    public inputFormControl:FormControl;

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

    private componentFactory:ComponentFactory<any>; // TODO: this has access to the inputs/outputs.. maybe use this for property binding purposes
    private componentRef:ComponentRef<any>;
    private componentInstance:any;

    // private controlType:Type<any>;
    private inputMap:TerraKeyValueInterface<string>;

    private onChangeCallback:(_:any) => void = noop;
    private onTouchedCallback:() => void = noop;

    private statusChangeSub:Subscription;

    @ViewChild(FormEntryContainerDirective)
    private container:FormEntryContainerDirective;

    constructor(private componentFactoryResolver:ComponentFactoryResolver)
    {}

    /**
     * Implementation of the OnInit life cycle hook.
     * @description Creates the component specified by the #inputFormField. Also starts listening to status changes of the FormControl instance to
     * highlight the formField if it is invalid.
     */
    public ngOnInit():void
    {
        let controlType:Type<any> = this.getControlType(this.inputControlTypeMap, this.inputFormField.type);
        this.createComponent(controlType);

        if(!isNullOrUndefined(this.inputFormControl))
        {
            this.inputFormControl.statusChanges.subscribe((status:string) =>
            {
                if(!isNullOrUndefined(this.componentInstance))
                {
                    this.componentInstance.isValid = status === 'VALID';
                }
            });
        }
    }

    /**
     * @description Dynamically creates a component given by its type and binds it to a given FormControl instance.
     * @param component
     */
    private createComponent(component:Type<any>):void
    {
        console.log(component);
        if(!this.hasChildren)
        {
            this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            this.componentRef = this.container.viewContainerRef.createComponent(this.componentFactory);
            this.componentInstance = this.componentRef.instance;

            this.bindInputProperties();

            if(isFunction(this.componentInstance.registerOnChange) &&
               isFunction(this.componentInstance.registerOnTouched))
            {
                this.componentInstance.registerOnChange((value:any):void => this.onChangeCallback(value));
                this.componentInstance.registerOnTouched(():void => this.onTouchedCallback());
            }
            else
            {
                console.error(
                    'Cannot bind component ' + component.name + ' to dynamic form. ' +
                    'Bound components needs to implement the ControlValueAccessor interface.'
                );
            }
        }
    }

    /**
     * Implementation of the OnChanges life cycle hook.
     * @description Updates the input bindings of the dynamically created component instance.
     * @param changes
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputFormField') || changes.hasOwnProperty('inputControlTypeMap'))
        {
            this.inputMap = this.getInputMap(this.inputControlTypeMap, this.inputFormField.type);
        }

        this.bindInputProperties();
    }

    /**
     * Implementation of the OnDestroy life cycle hook.
     * @description Destroys the component that has been created dynamically.
     */
    public ngOnDestroy():void
    {
        if(!isNullOrUndefined(this.statusChangeSub))
        {
            this.statusChangeSub.unsubscribe();
        }
        if(!isNullOrUndefined(this.componentRef))
        {
            this.componentRef.destroy();
        }
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Registers a given callback method that will be called whenever the form field represented by the dynamically created
     *     component changes its value.
     * @param changeCallback
     */
    public registerOnChange(changeCallback:(value:any) => void):void
    {
        this.onChangeCallback = changeCallback;
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Registers a given callback method that will be called when the form field represented by the dynamically created
     *     component has been touched.
     * @param touchedCallback
     */
    public registerOnTouched(touchedCallback:() => void):void
    {
        this.onTouchedCallback = touchedCallback;
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Writes a given value to the form field using the writeValue method of the dynamically created component instance.
     * @param value
     */
    public writeValue(value:any):void
    {
        if(this.componentInstance && isFunction(this.componentInstance.writeValue))
        {
            this.componentInstance.writeValue(value);
        }
    }

    private bindInputProperties():void
    {
        let controlType:Type<any> | TerraFormTypeInterface = this.inputControlTypeMap[this.inputFormField.type];
        if(!isNullOrUndefined(this.componentInstance) && !isNullOrUndefined(controlType))
        {
            if(!isNullOrUndefined(this.inputFormField.options))
            {
                Object.keys(this.inputFormField.options).forEach((optionKey:string) =>
                {
                    this.performInputBindings(this.inputMap, optionKey);
                });
            }

            if(this.inputMap.hasOwnProperty('isDisabled'))
            {
                this.componentInstance[this.inputMap['isDisabled']] = this.inputIsDisabled;
            }
            else
            {
                this.componentInstance['inputIsDisabled'] = this.inputIsDisabled;
            }
        }
    }

    protected get hasChildren():boolean
    {
        return !isNullOrUndefined(this.inputFormField.children);
    }

    private performInputBindings(inputMap:{ [key:string]:string }, optionKey:string):void
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
                console.warn('Cannot assign property ' + optionKey + ' on ' + this.componentInstance.constructor.name);
            }
        }
    }

    /**
     * @description Evaluates the control type (the actual component) of the given #inputFormField based on the #inputControlTypeMap.
     * If an unsupported type is given, TerraTextInputComponent is returned.
     * @param controlTypeMap
     * @param type
     */
    private getControlType(controlTypeMap:TerraKeyValueInterface<TerraFormTypeInterface | Type<any>>, type:string):Type<any>
    {
        let controlType:Type<any> | TerraFormTypeInterface = controlTypeMap[type];
        if(!this.isSupportedType(controlTypeMap, type))
        {
            console.warn(`Type ${type} not supported.`);
            return TestComponent;
        }

        if(controlType instanceof Type)
        {
            return controlType as Type<any>;
        }
        else
        {
            return (<TerraFormTypeInterface> controlType).component;
        }
    }

    /**
     * @description Evaluates whether an input mapping should be applied to a certain type. Returns the map if given.
     * @param controlTypeMap
     * @param type
     */
    private getInputMap(controlTypeMap:TerraKeyValueInterface<TerraFormTypeInterface | Type<any>>, type:string):TerraKeyValueInterface<string>
    {
        let controlType:TerraFormTypeInterface | Type<any> = controlTypeMap[type];
        if(!isNullOrUndefined(controlType) && !(controlType instanceof Type))
        {
            return (<TerraFormTypeInterface> controlType).inputMap;
        }
        return {};
    }

    /**
     * @description Determines whether a given #type is supported by a certain #controlTypeMap
     * @param controlTypeMap
     * @param type
     */
    private isSupportedType(controlTypeMap:TerraKeyValueInterface<TerraFormTypeInterface | Type<any>>, type:string):boolean
    {
        return controlTypeMap.hasOwnProperty(type) && !isNullOrUndefined(controlTypeMap[type]);
    }

    private transformInputPropertyName(propertyName:string):string
    {
        return 'input' + propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    }
}
