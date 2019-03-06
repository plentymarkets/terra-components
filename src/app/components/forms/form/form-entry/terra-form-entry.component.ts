import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    Type,
    ViewChild
} from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import {
    isArray,
    isFunction,
    isNullOrUndefined,
    isObject,
    isUndefined
} from 'util';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { TerraFormTypeInterface } from '../model/terra-form-type.interface';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraFormContainerComponent } from '../form-container/terra-form-container.component';
import { TerraTextInputComponent } from '../../input/text-input/terra-text-input.component';
import { TerraFormFieldHelper } from '../helper/terra-form-field.helper';
import { TerraFormEntryContainerDirective } from './terra-form-entry-container.directive';

@Component({
    selector: 'terra-form-entry',
    template: require('./terra-form-entry.component.html'),
    styles:   [require('./terra-form-entry.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraFormEntryComponent),
            multi:       true
        }
    ]
})
export class TerraFormEntryComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor
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

    @Input()
    public formKey:string;

    @Output()
    public outputFormValueChanged:EventEmitter<any> = new EventEmitter<any>();

    public formControl:FormControl;

    @Input()
    public inputFormGroup:FormGroup;

    protected containerClass:string;

    // @ViewChild('formEntryContainer', {read: ViewContainerRef})
    @ViewChild(TerraFormEntryContainerDirective)
    private container:TerraFormEntryContainerDirective;

    @ViewChild(TerraFormContainerComponent)
    private formContainer:TerraFormContainerComponent;

    private componentRef:ComponentRef<any>;
    private componentInstance:any;

    public constructor(private componentFactory:ComponentFactoryResolver,
                       // @Optional() @Host() public formContainer:TerraFormContainerComponent,
                       // @Optional() @Host() @Inject(forwardRef(() => TerraFormEntryListComponent)) public formList:TerraFormEntryListComponent
    )
    {
    }

    public ngOnInit():void
    {
        this.containerClass = 'form-entry-' + this.inputFormField.type;

        this.initComponent();

        // this.writeValue(this.inputFormValue);

        // setTimeout(() => // without setTimeout there would be an ExpressionChangedAfterItHasBeenCheckedError
        // {
        //     if(!this.hasChildren)
        //     {
        //
        //         // if(!isNullOrUndefined(this.formContainer))
        //         // {
        //         //     this.formContainer.formGroup.addControl(this.formKey, this.formControl);
        //         // }
        //         // else if(!isNullOrUndefined(this.formList))
        //         // {
        //         //     this.formList.formArray.insert(+this.formKey, this.formControl);
        //         // }
        //         // else
        //         // {
        //         //     console.error('Y no Code!!!');
        //         // }
        //     }
        // });
    }

    public ngAfterViewInit():void
    {
        this.formControl = new FormControl(this.inputFormValue, TerraFormFieldHelper.generateValidators(this.inputFormField));

        this.formControl.statusChanges.subscribe((status:any) =>
        {
            if(this.componentInstance)
            {
                this.componentInstance.isValid = status !== 'INVALID';
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

            if(isFunction(this.componentInstance.registerOnChange) && isFunction(this.componentInstance.writeValue))
            {
                if(isUndefined(this.inputFormValue) && !isNullOrUndefined(this.inputFormField.defaultValue))
                {
                    // this.onValueChanged(this.inputFormField.defaultValue);
                    this.onChangeCallback(this.inputFormField.defaultValue);
                }
                this.componentInstance.registerOnChange((value:any):void =>
                {
                    this.onValueChanged(value);
                    this.onChangeCallback(value);
                });

                this.componentInstance.registerOnTouched(():void => this.onTouchedCallback());

                this.writeValue(this.inputFormValue);
                // this.componentInstance.writeValue(this.inputFormValue);
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
        // if(changes.hasOwnProperty('inputFormValue') && !isNullOrUndefined(this.formControl))
        // {
        //     if(!isNullOrUndefined(this.componentInstance) && isFunction(this.componentInstance.writeValue))
        //     {
        //         // this.componentInstance.writeValue(this.inputFormValue);
        //         // this.writeValue(this.inputFormValue);
        //     }
        //     // setTimeout(() =>
        //     // {
        //     //    this.formControl.patchValue(this.inputFormValue);
        //     // });
        // }
    }

    // TODO has to be implemented in container and entry list as well
    public ngOnDestroy():void
    {
        // if(!this.hasChildren)
        // {
        //     // if(!isNullOrUndefined(this.formContainer))
        //     // {
        //     //     this.formContainer.formGroup.removeControl(this.formKey);
        //     // }
        //     // else if(!isNullOrUndefined(this.formList))
        //     // {
        //     //     this.formList.formArray.removeAt(+this.formKey);
        //     // }
        //     // else
        //     // {
        //     //     console.error('Y no Code!!!');
        //     // }
        // }
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
        this.inputFormValue = value;
        if(!this.hasChildren)
        {
            this.componentInstance.writeValue(this.inputFormValue);
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

    protected onValueChanged(value:any):void
    {
        if(value !== this.inputFormValue || isArray(value) || isObject(value))
        {
            this.inputFormValue = value;
            this.outputFormValueChanged.next(value);
        }
    }

    protected onChildValueChanged(key:string, value:any):void
    {
        if(isNullOrUndefined(this.inputFormValue) || !isObject(this.inputFormValue))
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

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;
}
