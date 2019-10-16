import {
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewContainerRef
} from '@angular/core';
import { ColumnConfigComponent } from './column-config.component';
import { ColumnConfigInterface } from './data/column-config.interface';

/**
 * @author mkunze
 */
@Directive({
    selector: '[hasColumnConfig]'
})
export class ColumnConfigDirective implements OnInit
{
    /**
     * Emits whenever the visibility or sorting is changed.
     */
    @Output()
    public columnsChanged:EventEmitter<Array<ColumnConfigInterface>> = new EventEmitter<Array<ColumnConfigInterface>>();

    /**
     * Columns with all informations.
     */
    @Input()
    public columns:Array<ColumnConfigInterface>;

    constructor(private componentFactoryResolver:ComponentFactoryResolver,
                private viewContainerRef:ViewContainerRef,
                private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
        let componentFactory:ComponentFactory<ColumnConfigComponent> =
            this.componentFactoryResolver.resolveComponentFactory(ColumnConfigComponent);

        const componentRef:ComponentRef<ColumnConfigComponent> =
            componentFactory.create(this.viewContainerRef.injector);

        const component:ColumnConfigComponent = <ColumnConfigComponent> componentRef.instance;

        component.columns = this.columns;
        component.columnsChanged = this.columnsChanged;

        this.viewContainerRef.insert(componentRef.hostView);

        const header:HTMLElement = this.elementRef.nativeElement as HTMLElement;

        const tableContainer:HTMLElement = header.closest('.table-container') as HTMLElement;

        let clientRect:ClientRect = header.getBoundingClientRect();

        if(tableContainer)
        {
            clientRect = tableContainer.getBoundingClientRect();
        }

        let componentNative:HTMLElement = componentRef.location.nativeElement as HTMLElement;

        componentNative.style.top = (clientRect.top + 10) + 'px';
        componentNative.style.position = 'absolute';
        componentNative.style.zIndex = '100';
        componentNative.style.right = (window.outerWidth - clientRect.right + 10) + 'px';
    }
}
