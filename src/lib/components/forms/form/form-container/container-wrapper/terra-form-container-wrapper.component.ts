import {
    ApplicationRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
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
import { TerraFormEntryBase } from '../../form-entry/terra-form-entry.base';

/**
 * Wraps custom components around terra-form-container component.
 * This enables usage of structural components to render nested forms
 */
@Component({
    selector: 'terra-form-container-wrapper',
    template: require('./terra-form-container-wrapper.component.html')
})
export class TerraFormContainerWrapperComponent extends TerraFormEntryBase implements OnInit, OnChanges, OnDestroy
{
    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputFormGroup:FormGroup;

    private innerComponentRef:ComponentRef<TerraFormContainerComponent>;

    constructor(
        private injector:Injector,
        private app:ApplicationRef,
        componentFactoryResolver:ComponentFactoryResolver)
    {
        super(componentFactoryResolver);
    }

    /**
     * Implementation of the OnInit life cycle hook.
     * @description Create instance of inner form container component and wrap it in dynamic structural component
     */
    public ngOnInit():void
    {
        // create instance of nested TerraFormContainerComponent
        this.innerComponentRef = this.componentFactoryResolver
                                  .resolveComponentFactory(TerraFormContainerComponent)
                                  .create(this.injector);
        this.app.attachView(this.innerComponentRef.hostView);

        this.passInputProperties();

        this.initComponent(TerraPortletComponent, [[this.innerComponentRef.location.nativeElement]]);
    }

    /**
     * Implementation of the OnChanges life cycle hook.
     * @description Pass input properties to inner form container component.
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        super.ngOnChanges(changes);
        this.passInputProperties();
    }

    /**
     * Implementation of the OnDestroy life cycle hook.
     * @description Destroys the component that has been created dynamically.
     */
    public ngOnDestroy():void
    {
        super.ngOnDestroy();
        if(this.componentRef)
        {
            this.innerComponentRef.destroy();
        }
    }

    private passInputProperties():void
    {
        if(this.innerComponentRef)
        {
            this.innerComponentRef.instance.inputScope = this.inputScope;
            this.innerComponentRef.instance.inputControlTypeMap = this.inputControlTypeMap;
            this.innerComponentRef.instance.inputFormGroup = this.inputFormGroup;
            this.innerComponentRef.instance.inputFormFields = this.inputFormField.children;
            this.innerComponentRef.instance.inputIsDisabled = this.inputIsDisabled;
        }
    }
}
