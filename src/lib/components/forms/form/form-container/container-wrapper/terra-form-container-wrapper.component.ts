import {
    ApplicationRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Injector,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    Type,
    ViewChild,
} from '@angular/core';
import {
    TerraFormContainerComponent,
    TerraFormFieldInterface,
    TerraFormScope,
    TerraPortletComponent,
    TerraTextInputComponent,
} from '../../../../..';
import { FormEntryContainerDirective } from '../../form-entry/form-entry-container.directive';
import { TerraFormTypeInterface } from '../../model/terra-form-type.interface';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

/**
 * Wraps custom components around terra-form-container component.
 * This enables usage of structural components to render nested forms
 */
@Component({
    selector: 'terra-form-container-wrapper',
    template: require('./terra-form-container-wrapper.component.html')
})
export class TerraFormContainerWrapperComponent implements OnInit, OnChanges
{
    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> | TerraFormTypeInterface } = {};

    @Input()
    public inputFormGroupName:string;

    @Input()
    public inputIsDisabled:boolean = false;

    @Input()
    public inputFormGroup:FormGroup;

    @Input()
    public inputFormField:TerraFormFieldInterface;

    @ViewChild(FormEntryContainerDirective)
    private container:FormEntryContainerDirective;

    private componentInstance:any;
    private innerComponent:ComponentRef<TerraFormContainerComponent>;

    constructor(private componentFactoryResolver:ComponentFactoryResolver, private injector:Injector, private app:ApplicationRef)
    {
    }

    public ngOnInit():void
    {
        this.initComponent();
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        this.passInputProperties();
    }

    private initComponent():void
    {
        // create instance of nested TerraFormContainerComponent
        this.innerComponent = this.componentFactoryResolver
                                  .resolveComponentFactory(TerraFormContainerComponent)
                                  .create(this.injector);
        this.app.attachView(this.innerComponent.hostView);
        this.passInputProperties();

        // determine control type to be used as container for nested form fields
        let controlType:Type<any> = TerraPortletComponent;
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

        // create instance of container component and pass inner TerraFormContainerComponent as projected node
        let componentRef:ComponentRef<any> = this.container.viewContainerRef.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(controlType),
            undefined,
            undefined,
            [[this.innerComponent.location.nativeElement]]
        );
        this.componentInstance = componentRef.instance;
        this.bindInputProperties();
    }

    private passInputProperties():void
    {
        if(this.innerComponent)
        {
            this.innerComponent.instance.inputScope = this.inputScope;
            this.innerComponent.instance.inputControlTypeMap = this.inputControlTypeMap;
            this.innerComponent.instance.inputFormGroup = this.inputFormGroup;
            this.innerComponent.instance.inputFormFields = this.inputFormField.children;
            this.innerComponent.instance.inputIsDisabled = this.inputIsDisabled;
            this.innerComponent.changeDetectorRef.detectChanges();
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
                this.componentInstance[inputMap['isDisabled']] = this.inputIsDisabled;
            }
            else
            {
                this.componentInstance['inputIsDisabled'] = this.inputIsDisabled;
            }
        }
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
