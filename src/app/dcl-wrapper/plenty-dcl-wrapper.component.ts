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
               templateUrl: 'plenty-dcl-wrapper.component.html',
               styleUrls:   ['plenty-dcl-wrapper.component.css']
           })
export class PlentyDclWrapper
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

        if(this.cmpRef.instance.initIframe)
        {
            this.cmpRef.instance.initIframe(this.routeData);
        }

        for(var item in this.data)
        {
            this.cmpRef.instance[item] = this.data[item];
        }

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
