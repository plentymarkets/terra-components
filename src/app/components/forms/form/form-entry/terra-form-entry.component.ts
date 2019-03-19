import {
    Component,
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
import { TerraFormScope } from '../model/terra-form-scope.data';
import { TerraFormTypeInterface } from '../model/terra-form-type.interface';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraTextInputComponent } from '../../input/text-input/terra-text-input.component';
import { TerraFormEntryContainerDirective } from './terra-form-entry-container.directive';

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
    @Input()
    public inputFormField:TerraFormFieldInterface;

    /**
     * @description Corresponding formControl to the given formField.
     */
    @Input()
    public inputFormControl:FormControl;

    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> | TerraFormTypeInterface } = {};

    @Input()
    public inputIsDisabled:boolean = false;

    private componentRef:ComponentRef<any>;
    private componentInstance:any;

    @ViewChild(TerraFormEntryContainerDirective)
    private container:TerraFormEntryContainerDirective;

    constructor(private componentFactory:ComponentFactoryResolver)
    {}

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

    public initComponent():void
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

            this.componentRef = this.container.viewContainerRef.createComponent(
                this.componentFactory.resolveComponentFactory(controlType)
                // TODO: this has access to the inputs/outputs.. maybe use this for property binding purposes
            );

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

    public ngOnChanges(changes:SimpleChanges):void
    {
        this.bindInputProperties();
    }

    public ngOnDestroy():void
    {
        if(!isNullOrUndefined(this.componentRef))
        {
            this.componentRef.destroy();
        }
    }

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    public writeValue(value:any):void
    {
        if(this.componentInstance)
        {
            this.componentInstance.writeValue(value);
        }
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
                            console.warn('Cannot assign property ' + optionKey + ' on ' + this.componentInstance.constructor.name);
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

    protected get hasChildren():boolean
    {
        return !isNullOrUndefined(this.inputFormField.children);
    }

    private transformInputPropertyName(propertyName:string):string
    {
        return 'input' + propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;
}
