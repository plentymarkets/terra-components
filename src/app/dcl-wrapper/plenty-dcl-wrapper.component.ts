import {
    Component,
    ViewChild,
    ViewContainerRef,
    Input,
    ComponentRef,
    ComponentFactoryResolver,
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy,
    OnChanges
} from '@angular/core';

@Component({
               selector: 'dcl-wrapper',
               styles:   [require('./plenty-dcl-wrapper.component.scss').toString()],
               template: require('./plenty-dcl-wrapper.component.html')
           })
export class PlentyDclWrapper implements AfterViewInit, OnDestroy, OnChanges
{
    @ViewChild('viewChildTarget', {read: ViewContainerRef}) viewChildTarget;
    @Input() inputType;
    @Input() imputRouteData;
    @Input() inputData:Array<any>;
    
    private _cmpRef:ComponentRef<any>;
    private _isViewInitialized:boolean = false;
    
    constructor(private _componentFactoryResolver:ComponentFactoryResolver,
                private _cdRef:ChangeDetectorRef)
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
            // when the `inputType` input changes we destroy a previously
            // created component before creating the new one
            this._cmpRef.destroy();
        }
        
        let factory = this._componentFactoryResolver.resolveComponentFactory(this.inputType);
        this._cmpRef = this.viewChildTarget.createComponent(factory);
    }
    
    ngOnChanges()
    {
        this.updateComponent();
    }
    
    ngAfterViewInit()
    {
        this._isViewInitialized = true;
        this.updateComponent();
        this._cdRef.detectChanges();
    }
    
    ngOnDestroy()
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }
}
