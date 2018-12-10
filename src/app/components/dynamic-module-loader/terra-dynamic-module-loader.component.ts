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
    template: require('./terra-dynamic-module-loader.component.html'),
    styles:   [require('./terra-dynamic-module-loader.component.scss')]
})
export class TerraDynamicModuleLoaderComponent implements AfterViewInit, OnChanges, OnDestroy
{
    @ViewChild('viewChildTarget', {read: ViewContainerRef})
    public viewChildTarget:ViewContainerRef;

    @Input()
    public inputModule:any;

    @Input()
    public inputMainComponentName:string;

    @Input()
    public inputInputs:Array<TerraDynamicLoadedComponentInputInterface>;

    @Input()
    public inputView:TerraMultiSplitViewInterface;
    private resolvedData:ModuleWithProviders;

    private cmpRef:ComponentRef<any>;

    constructor(private jitCompiler:Compiler)
    {
    }

    public ngAfterViewInit():void
    {
        this.resolvedData = this.inputModule as ModuleWithProviders;
        this.updateComponent();
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputInputs'))
        {
            this.assignInputProperties();
        }
    }

    public ngOnDestroy():void
    {
        if(this.cmpRef)
        {
            this.cmpRef.destroy();
        }
    }

    private updateComponent():void
    {
        this.jitCompiler.compileModuleAndAllComponentsAsync(this.resolvedData.ngModule)
            .then((moduleWithFactories:ModuleWithComponentFactories<any>) =>
            {
                moduleWithFactories.componentFactories.forEach((factory:ComponentFactory<any>):void =>
                    {
                        if(this.inputMainComponentName === factory.componentType.name)
                        {
                            // create the component
                            this.cmpRef = this.viewChildTarget.createComponent(factory);

                            // pass the instance of the loaded view back to the component
                            this.cmpRef.instance.splitViewInstance = this.inputView;

                            // add inputs to component for data binding purposes
                            this.assignInputProperties();
                        }
                    }
                );

            });
    }

    private assignInputProperties():void
    {
        if(!isNullOrUndefined(this.inputInputs) && this.cmpRef)
        {
            this.inputInputs.forEach((input:TerraDynamicLoadedComponentInputInterface) =>
                {
                    if(!isNullOrUndefined(input) && !isNullOrUndefined(input.name))
                    {
                        this.cmpRef.instance[input.name] = input.value;
                    }
                }
            );
            this.cmpRef.changeDetectorRef.detectChanges();
        }
    }
}
