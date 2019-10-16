import {
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
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

        const columnConfigComponentRef:ComponentRef<ColumnConfigComponent> =
            componentFactory.create(this.viewContainerRef.injector);

        const columnConfigComponent:ColumnConfigComponent = <ColumnConfigComponent>columnConfigComponentRef.instance;

        columnConfigComponent.columns = this.columns;
        columnConfigComponent.columnsChanged = this.columnsChanged;

        this.viewContainerRef.insert(columnConfigComponentRef.hostView);

        const header:HTMLElement = this.elementRef.nativeElement as HTMLElement;

        const tableContainer:HTMLElement = header.closest('.table-container') as HTMLElement;

        let clientRect:ClientRect = header.getBoundingClientRect();

        if(tableContainer)
        {
            clientRect = tableContainer.getBoundingClientRect();
        }

        let columnComponentElement:HTMLElement = columnConfigComponentRef.location.nativeElement as HTMLElement;

        columnComponentElement.style.visibility = 'hidden';

        header.onmouseover = ():void =>
        {
            columnComponentElement.style.visibility = 'visible';
        };

        header.onmouseout = ():void =>
        {
            //columnComponentElement.style.visibility = 'hidden';
        };

        columnComponentElement.style.top = (clientRect.top - 31) + 'px';
        columnComponentElement.style.position = 'absolute';
        columnComponentElement.style.zIndex = '100';
        columnComponentElement.style.left = clientRect.left + 'px';
    }
}
