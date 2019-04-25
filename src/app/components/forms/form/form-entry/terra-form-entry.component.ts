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

    private onChangeCallback:(_:any) => void = noop;
    private onTouchedCallback:() => void = noop;

    @ViewChild(FormEntryContainerDirective)
    private container:FormEntryContainerDirective;

    constructor(private componentFactoryResolver:ComponentFactoryResolver)
    {}

    /**
     * Implementation of the OnInit life cycle hook.
     * @description Dynamically creates a component that will be bound to the given FormControl instance based on the specification of the
     *     `inputFormField`. Also starts listening to status changes of the FormControl instance to highlight the formField if it is
     *     invalid.
     */
    public ngOnInit():void
    {
        this.initComponent();

        this.inputFormControl.statusChanges.subscribe((status:string) =>
        {
            if(!isNullOrUndefined(this.componentInstance))
            {
                this.componentInstance.isValid = status === 'VALID';
            }
        });
    }

    private initComponent():void
    {
        if(!this.hasChildren)
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

            this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlType);
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
                    'Cannot bind component ' + controlType.name + ' to dynamic form. ' +
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
                this.componentInstance[inputMap['isDisabled']] = this.inputIsDisabled || this.inputFormField.options['isDisabled'];
            }
            else
            {
                this.componentInstance['inputIsDisabled'] = this.inputIsDisabled || this.inputFormField.options['isDisabled'];
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

    private transformInputPropertyName(propertyName:string):string
    {
        return 'input' + propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    }
}
