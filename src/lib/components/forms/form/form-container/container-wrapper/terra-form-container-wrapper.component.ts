import {
    ApplicationRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TerraFormEntryBase } from '../../form-entry/terra-form-entry.base';
import { TerraFormScope } from '../../model/terra-form-scope.data';
import { TerraFormContainerComponent } from '../terra-form-container.component';
import { TerraPortletComponent } from '../../../../layouts/portlet/terra-portlet.component';

/**
 * Wraps custom components around terra-form-container component.
 * This enables usage of structural components to render nested forms
 */
@Component({
    selector:    'terra-form-container-wrapper',
    templateUrl: './terra-form-container-wrapper.component.html'
})
export class TerraFormContainerWrapperComponent extends TerraFormEntryBase implements OnInit, OnChanges, OnDestroy
{
    /**
     * @description The scope of the inner form elements. Will be passed through to inner form container.
     * @see TerraFormContainerComponent.inputScope
     */
    @Input()
    public inputScope:TerraFormScope;

    /**
     * @description The form group of the inner form container.
     * @see TerraFormContainerComponent.inputFormGroup
     */
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
        this.innerComponentRef = this._componentFactoryResolver
                                  .resolveComponentFactory(TerraFormContainerComponent)
                                  .create(this.injector);

        this.app.attachView(this.innerComponentRef.hostView);
        this.passInputProperties();

        this._initComponent(TerraPortletComponent, [[this.innerComponentRef.location.nativeElement]]);
    }

    /**
     * Implementation of the OnChanges life cycle hook.
     * @description Pass input properties to inner form container component.
     */
    public ngOnChanges():void
    {
         this.passInputProperties();
         super.ngOnChanges();
    }

    /**
     * Implementation of the OnDestroy life cycle hook.
     * @description Destroys the component that has been created dynamically.
     */
    public ngOnDestroy():void
    {
        super.ngOnDestroy();
        if(this._componentRef)
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
            this.innerComponentRef.changeDetectorRef.detectChanges();
        }
    }
}
