import {
    AfterViewInit,
    Component,
    ComponentRef,
    Input,
    ModuleWithComponentFactories,
    ModuleWithProviders,
    OnDestroy,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { JitCompiler } from '@angular/compiler';
import { TerraMultiSplitViewInterface } from '../split-view/multi/data/terra-multi-split-view.interface';

@Component({
               selector: 'terra-dynamic-module-loader',
               template: require('./terra-dynamic-module-loader.component.html'),
               styles:   [require('./terra-dynamic-module-loader.component.scss')]
           })
export class TerraDynamicModuleLoaderComponent implements AfterViewInit, OnDestroy
{
    @ViewChild('viewChildTarget', {read: ViewContainerRef}) viewChildTarget;
    @Input() inputModule:any;
    @Input() inputMainComponentName:string;
    @Input() inputParameter:any;
    @Input() inputView:TerraMultiSplitViewInterface;
    private _resolvedData:ModuleWithProviders;

    private _cmpRef:ComponentRef<any>;

    constructor(private _jitCompiler:JitCompiler)
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
        this._jitCompiler
            .compileModuleAndAllComponentsAsync(this._resolvedData.ngModule)
            .then((moduleWithFactories:ModuleWithComponentFactories<any>) =>
                  {
                      moduleWithFactories.componentFactories.forEach
                      (
                          (factory) =>
                          {
                              if(this.inputMainComponentName === factory.componentType.name)
                              {
                                  // create the component
                                  this._cmpRef = this.viewChildTarget.createComponent(factory);

                                  // pass the delivered parameter to the component
                                  this._cmpRef.instance.parameter = this.inputParameter;

                                  // pass the instance of the loaded view back to the component
                                  this._cmpRef.instance.splitViewInstance = this.inputView;
                              }
                          }
                      )

                  });
    }
}
