import {
    AfterViewInit,
    Component,
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
               template: require('./terra-dynamic-component-loader.component.html'),
           })
export class TerraDynamicComponentLoaderComponent implements AfterViewInit, OnDestroy, OnChanges
{
    @ViewChild('viewChildTarget', {read: ViewContainerRef}) viewChildTarget;
    @Input() inputComponent:Type<any>;

    private _cmpRef:ComponentRef<any>;

    constructor(private _componentFactoryResolver:ComponentFactoryResolver)
    {
    }

    ngOnChanges(changes:SimpleChanges):void
    {
        if(changes["inputComponent"])
        {
            this.updateComponent();
        }
    }

    ngAfterViewInit():void
    {
        this.updateComponent();
    }

    ngOnDestroy():void
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
            let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.inputComponent);

            let viewContainerRef = this.viewChildTarget;
            viewContainerRef.clear();

            let componentRef = viewContainerRef.createComponent(componentFactory);
        }
    }
}
