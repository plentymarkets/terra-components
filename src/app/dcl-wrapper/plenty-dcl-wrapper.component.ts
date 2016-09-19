import {
    Component,
    ViewChild,
    ViewContainerRef,
    Input,
    ComponentRef,
    ComponentFactoryResolver,
    ChangeDetectorRef
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

    private _cmpRef:ComponentRef<any>;
    private _isViewInitialized:boolean = false;

    constructor(private componentFactoryResolver:ComponentFactoryResolver,
                private cdRef:ChangeDetectorRef)
    {
    }

    private updateComponent():void
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

        let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
        this._cmpRef = this.target.createComponent(factory);

        if(this._cmpRef.instance.initIframe)
        {
            this._cmpRef.instance.initIframe(this.routeData);
        }
    }

    ngAfterViewInit()
    {
        this._isViewInitialized = true;
        this.updateComponent();
        this.cdRef.detectChanges();
    }

    ngOnDestroy()
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }

}
