import {
    Component,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { TerraFormEntryBase } from '../../form-entry/terra-form-entry.base';
import { TerraPortletComponent } from '../../../../layouts/portlet/terra-portlet.component';

/**
 * Wraps custom components around terra-form-container component.
 * This enables usage of structural components to render nested forms
 */
@Component({
    selector: 'terra-form-container-wrapper',
    templateUrl: './terra-form-container-wrapper.component.html'
})
export class TerraFormContainerWrapperComponent extends TerraFormEntryBase implements OnInit, OnChanges, OnDestroy {
    @Input()
    public containerTemplate: TemplateRef<any>;

    constructor(componentFactoryResolver: ComponentFactoryResolver, private vc: ViewContainerRef) {
        super(componentFactoryResolver);
    }

    /**
     * Implementation of the OnInit life cycle hook.
     * @description Create instance of inner form container component and wrap it in dynamic structural component
     */
    public ngOnInit(): void {
        const embeddedView: EmbeddedViewRef<any> = this.vc.createEmbeddedView(this.containerTemplate);
        this._initComponent(TerraPortletComponent, [embeddedView.rootNodes]);
    }
}
