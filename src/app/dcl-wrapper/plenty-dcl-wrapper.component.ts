import {
    Component,
    ViewChild,
    ViewContainerRef,
    Input,
    ComponentRef,
    ComponentFactoryResolver,
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';

@Component({
               selector: 'dcl-wrapper',
               styles:   [require('./plenty-dcl-wrapper.component.scss').toString()],
               template: require('./plenty-dcl-wrapper.component.html')
           })
export class PlentyDclWrapper implements AfterViewInit, OnDestroy
{
    @ViewChild('target', {read: ViewContainerRef}) target;
    @Input() type;
    @Input() routeData;
    @Input() identifier;
    @Input() data:Array<any>;

    private cmpRef:ComponentRef<any>;
    private isViewInitialized:boolean = false;

    constructor(private componentFactoryResolver:ComponentFactoryResolver,
                private cdRef:ChangeDetectorRef)
    {
    }

    private updateComponent():void
    {
        if(!this.isViewInitialized)
        {
            return;
        }

        if(this.cmpRef)
        {
            // when the `type` input changes we destroy a previously
            // created component before creating the new one
            this.cmpRef.destroy();
        }

        let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
        this.cmpRef = this.target.createComponent(factory);

        for(var item in this.data)
        {
            this.cmpRef.instance[item] = this.data[item];
        }

    }

    ngOnChanges()
    {
        this.updateComponent();
    }

    ngAfterViewInit()
    {
        this.isViewInitialized = true;
        this.updateComponent();
        this.cdRef.detectChanges();
    }

    ngOnDestroy()
    {
        if(this.cmpRef)
        {
            this.cmpRef.destroy();
        }
    }

}
