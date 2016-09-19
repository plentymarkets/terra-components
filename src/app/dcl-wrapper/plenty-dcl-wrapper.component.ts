import {
    Component,
    ViewChild,
    ViewContainerRef,
    Input,
    ComponentRef,
    ComponentFactoryResolver,
    Compiler
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
    @Input() routeData;
    @Input() identifier;

    private _cmpRef: ComponentRef<any>;
    private _isViewInitialized: boolean = false;
    private factory;

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

        this.factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
        this._cmpRef = this.target.createComponent(this.factory);
        // to access the created instance use
        // this.compRef.instance.someProperty = 'someValue';
        // this.compRef.instance.someOutput.subscribe(val => doSomething());

        if(this._cmpRef.instance.initIframe)
        {
            this._cmpRef.instance.initIframe(this.routeData);
        }
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
