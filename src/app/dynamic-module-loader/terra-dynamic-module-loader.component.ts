import {
    Component,
    ViewContainerRef,
    ComponentRef,
    OnDestroy,
    AfterViewInit,
    ModuleWithComponentFactories,
    ModuleWithProviders,
    Input,
    ViewChild
} from '@angular/core';
//import { RuntimeCompiler } from '@angular/compiler';

@Component({
               selector: 'terra-dynamic-module-loader',
               template: require('./terra-dynamic-module-loader.component.html'),
               styles:   [require('./terra-dynamic-module-loader.component.scss').toString()]
           })

export class TerraDynamicModuleLoaderComponent implements AfterViewInit, OnDestroy
{
    
    @ViewChild('viewChildTarget', {read: ViewContainerRef}) viewChildTarget;
    @Input() inputModule:any;
    @Input() inputMainComponentName:string;
    private _resolvedData:ModuleWithProviders;
    
    private _cmpRef:ComponentRef<any>;
    
    constructor()//private _runtimeCompiler:RuntimeCompiler)
    {
    }
    
    ngAfterViewInit()
    {
        this._resolvedData = this.inputModule as ModuleWithProviders;
        this.updateComponent();
    }
    
    ngOnDestroy()
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }
    
    private updateComponent():void
    {
        //this._runtimeCompiler
        //    .compileModuleAndAllComponentsAsync(this._resolvedData.ngModule)
        //    .then((moduleWithFactories:ModuleWithComponentFactories<any>) =>
        //          {
        //              moduleWithFactories.componentFactories.forEach
        //              (
        //                  (factory) =>
        //                  {
        //                      if(this.inputMainComponentName === factory.componentType.name)
        //                      {
        //                          this._cmpRef = this.viewChildTarget.createComponent(factory);
        //                      }
        //                  }
        //              )
        //
        //          });
    }
}
