import {
    AfterViewInit,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-dynamic-component-loader',
    templateUrl: './terra-dynamic-component-loader.component.html',
})
export class TerraDynamicComponentLoaderComponent implements AfterViewInit, OnDestroy, OnChanges
{
    @ViewChild('viewChildTarget', {read: ViewContainerRef})
    public _viewChildTarget:ViewContainerRef;

    @Input()
    public inputComponent:Type<any>;

    private _cmpRef:ComponentRef<any>;

    constructor(private componentFactoryResolver:ComponentFactoryResolver)
    {
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['inputComponent'])
        {
            this.ngOnDestroy();
            this.updateComponent();
        }
    }

    public ngAfterViewInit():void
    {
        this.updateComponent();
    }

    public ngOnDestroy():void
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }

    private updateComponent():void
    {
        if(!isNullOrUndefined(this.inputComponent))
        {
            let componentFactory:ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(this.inputComponent);

            let viewContainerRef:ViewContainerRef = this._viewChildTarget;
            viewContainerRef.clear();

            this._cmpRef = viewContainerRef.createComponent(componentFactory);
        }
    }
}
