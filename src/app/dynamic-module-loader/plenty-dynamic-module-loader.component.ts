import {
    Component,
    ViewContainerRef,
    ComponentRef,
    OnDestroy,
    AfterViewInit,
    ModuleWithComponentFactories,
    ModuleWithProviders
} from '@angular/core';
import { ViewChild } from '@angular/core/src/metadata/di';
import { ActivatedRoute } from '@angular/router';
import { RuntimeCompiler } from '@angular/compiler';

@Component({
               selector: 'terra-dynamic-module-loader',
               template: require('./plenty-dynamic-module-loader.component.html'),
               styles:   [require('./plenty-dynamic-module-loader.component.scss').toString()]
           })

export class PlentyDynamicModuleLoaderComponent implements AfterViewInit, OnDestroy
{

    @ViewChild('target', {read: ViewContainerRef}) target;

    private _resolvedData:ModuleWithProviders;

    private cmpRef:ComponentRef<any>;

    constructor(private _activatedRoute:ActivatedRoute,
                private _runtimeCompiler:RuntimeCompiler)
    {
    }

    ngOnChanges()
    {
        this.updateComponent();
    }

    ngAfterViewInit()
    {
        this._activatedRoute
            .data
            .subscribe(
                (resolveData) =>
                {
                    this._resolvedData = resolveData as ModuleWithProviders;
                });

        this.updateComponent();
    }

    ngOnDestroy()
    {
        if(this.cmpRef)
        {
            this.cmpRef.destroy();
        }
    }

    private updateComponent():void
    {
        this._runtimeCompiler
            .compileModuleAndAllComponentsAsync(this._resolvedData.ngModule)
            .then((moduleWithFactories:ModuleWithComponentFactories<any>) =>
                  {
                      this.cmpRef = this.target.createComponent(moduleWithFactories.componentFactories[0]);
                  });
    }
}