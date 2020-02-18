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
    @Input()
    public inputComponent:Type<any>;

    @ViewChild('viewChildTarget', { read: ViewContainerRef, static: true })
    private _viewChildTarget:ViewContainerRef;

    private _cmpRef:ComponentRef<any>;

    constructor(private _componentFactoryResolver:ComponentFactoryResolver)
    {
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['inputComponent'])
        {
            this._destroyCmpRef();
            this._updateComponent();
        }
    }

    public ngAfterViewInit():void
    {
        this._updateComponent();
    }

    public ngOnDestroy():void
    {
        this._destroyCmpRef();
    }

    private _updateComponent():void
    {
        if(!isNullOrUndefined(this.inputComponent))
        {
            let componentFactory:ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(this.inputComponent);

            let viewContainerRef:ViewContainerRef = this._viewChildTarget;
            viewContainerRef.clear();

            this._cmpRef = viewContainerRef.createComponent(componentFactory);
        }
    }

    private _destroyCmpRef():void
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }
}
