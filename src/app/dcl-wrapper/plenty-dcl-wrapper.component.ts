import {
    Component,
    ViewChild,
    ViewContainerRef,
    Input,
    ComponentRef,
    ComponentFactoryResolver,
    Compiler,
    ComponentFactory
} from '@angular/core';

@Component({
               selector:    'dcl-wrapper',
               templateUrl: './plenty-dcl-wrapper.component.html',
               styleUrls:   ['./plenty-dcl-wrapper.component.css']
           })
export class PlentyDclWrapper
{
    @ViewChild('target', {read: ViewContainerRef}) target;
    @Input() type;

    private _cmpRef: ComponentRef<Component>;
    private _isViewInitialized: boolean = false;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private compiler: Compiler)
    {
    }

    private updateComponent(): void
    {
        if(!this._isViewInitialized)
        {
            return;
        }

        if(this._cmpRef)
        {
            // when the `type` input changes we destroy a previously
            // created component before creating the new one
            this._cmpRef.destroy();
        }

        let factory: ComponentFactory<Component> = this.componentFactoryResolver.resolveComponentFactory(this.type);
        this._cmpRef = this.target.createComponent(factory);
        // to access the created instance use
        // this.compRef.instance.someProperty = 'someValue';
        // this.compRef.instance.someOutput.subscribe(val => doSomething());
    }

    ngOnChanges()
    {
        this.updateComponent();
    }

    ngAfterViewInit()
    {
        this._isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy()
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }

}
