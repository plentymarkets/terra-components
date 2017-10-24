import {
    AfterViewInit,
    Component,
    ComponentRef,
    Input,
    ModuleWithComponentFactories,
    ModuleWithProviders,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { JitCompiler } from '@angular/compiler';
import { TerraMultiSplitViewInterface } from '../split-view/multi/data/terra-multi-split-view.interface';
import { isNullOrUndefined } from 'util';
import { TerraDynamicLoadedComponentInputInterface } from './data/terra-dynamic-loaded-component-input.interface';

@Component({
    selector: 'terra-dynamic-module-loader',
    template: require('./terra-dynamic-module-loader.component.html'),
    styles:   [require('./terra-dynamic-module-loader.component.scss')]
})
export class TerraDynamicModuleLoaderComponent implements AfterViewInit, OnChanges, OnDestroy
{
    @ViewChild('viewChildTarget', {read: ViewContainerRef}) viewChildTarget;
    @Input() inputModule:any;
    @Input() inputMainComponentName:string;
    @Input() inputParameter:any; // TODO: remove input if old split-view is removed
    @Input() inputInputs:Array<TerraDynamicLoadedComponentInputInterface>;
    @Input() inputView:TerraMultiSplitViewInterface;
    private _resolvedData:ModuleWithProviders;

    private _cmpRef:ComponentRef<any>;

    constructor(private _jitCompiler:JitCompiler)
    {
    }

    public ngAfterViewInit()
    {
        this._resolvedData = this.inputModule as ModuleWithProviders;
        this.updateComponent();
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if ( changes.hasOwnProperty('inputInputs') )
        {
            this.assignInputProperties();
        }
    }

    public ngOnDestroy()
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }

    private updateComponent():void
    {
        this._jitCompiler.compileModuleAndAllComponentsAsync(this._resolvedData.ngModule)
            .then((moduleWithFactories:ModuleWithComponentFactories<any>) =>
            {
                moduleWithFactories.componentFactories.forEach((factory) =>
                    {
                        if(this.inputMainComponentName === factory.componentType.name)
                        {
                            // create the component
                            this._cmpRef = this.viewChildTarget.createComponent(factory);

                            // pass the delivered parameter to the component
                            this._cmpRef.instance.parameter = this.inputParameter; // TODO: deprecated if old split view is removed

                            // add inputs to component for data binding purposes
                            this.assignInputProperties();

                            // pass the instance of the loaded view back to the component
                            this._cmpRef.instance.splitViewInstance = this.inputView;
                        }
                    }
                );

            });
    }

    private assignInputProperties()
    {
        if(!isNullOrUndefined(this.inputInputs) && this._cmpRef)
        {
            this.inputInputs.forEach((input:TerraDynamicLoadedComponentInputInterface) =>
                {
                    if(!isNullOrUndefined(input) && !isNullOrUndefined(input.name))
                    {
                        this._cmpRef.instance[input.name] = input.value;
                    }
                }
            );
        }
    }
}
