import {
    AfterViewInit,
    Compiler,
    Component,
    ComponentFactory,
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
import { TerraMultiSplitViewInterface } from '../split-view/multi/interfaces/terra-multi-split-view.interface';
import { isNullOrUndefined } from 'util';
import { TerraDynamicLoadedComponentInputInterface } from './data/terra-dynamic-loaded-component-input.interface';

@Component({
    selector: 'terra-dynamic-module-loader',
    templateUrl: './terra-dynamic-module-loader.component.html',
    styleUrls: [ './terra-dynamic-module-loader.component.scss']
})
export class TerraDynamicModuleLoaderComponent implements AfterViewInit, OnChanges, OnDestroy
{
    @Input()
    public inputModule:any;

    @Input()
    public inputMainComponentName:string;

    @Input()
    public inputInputs:Array<TerraDynamicLoadedComponentInputInterface>;

    @Input()
    public inputView:TerraMultiSplitViewInterface;

    @ViewChild('viewChildTarget', {read: ViewContainerRef})
    private _viewChildTarget:ViewContainerRef;

    private _resolvedData:ModuleWithProviders<any>;
    private _cmpRef:ComponentRef<any>;

    constructor(private _jitCompiler:Compiler)
    {
    }

    public ngAfterViewInit():void
    {
        this._resolvedData = this.inputModule as ModuleWithProviders;
        this._updateComponent();
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputInputs'))
        {
            this._assignInputProperties();
        }
    }

    public ngOnDestroy():void
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }

    private _updateComponent():void
    {
        this._jitCompiler.compileModuleAndAllComponentsAsync(this._resolvedData.ngModule)
            .then((moduleWithFactories:ModuleWithComponentFactories<any>) =>
            {
                moduleWithFactories.componentFactories.forEach((factory:ComponentFactory<any>):void =>
                    {
                        if(this.inputMainComponentName === factory.componentType.name)
                        {
                            // create the component
                            this._cmpRef = this._viewChildTarget.createComponent(factory);

                            // pass the instance of the loaded view back to the component
                            this._cmpRef.instance.splitViewInstance = this.inputView;

                            // add inputs to component for data binding purposes
                            this._assignInputProperties();
                        }
                    }
                );

            });
    }

    private _assignInputProperties():void
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
            this._cmpRef.changeDetectorRef.detectChanges();
        }
    }
}
