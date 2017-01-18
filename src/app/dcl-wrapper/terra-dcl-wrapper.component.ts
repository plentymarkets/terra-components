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
import { TerraInputComponent } from '../forms/input/terra-input.component';
import { TerraMultiSelectBoxComponent } from '../forms/multi-select-box/terra-multi-select-box.component';
import { TerraSelectBoxComponent } from '../forms/select-box/terra-select-box.component';
import { TerraSuggestionBoxComponent } from '../forms/suggestion-box/terra-suggestion-box.component';

@Component({
               selector: 'terra-dcl-wrapper',
               styles:   [require('./terra-dcl-wrapper.component.scss').toString()],
               template: require('./terra-dcl-wrapper.component.html')
           })
export class TerraDclWrapperComponent implements AfterViewInit, OnDestroy, OnChanges
{
    @ViewChild('viewChildTarget', {read: ViewContainerRef}) viewChildTarget;
    @Input() inputType;
    @Input() inputName;
    @Input() inputIdentifier;
    
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
        this.mapCompAttributes();
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
    
    private mapCompAttributes()
    {
        //evt. benötigte Filterkomponente ergänzen bzw. weitere Attribute mappen
        if(this._cmpRef.instance instanceof TerraInputComponent            ||
           this._cmpRef.instance instanceof TerraMultiSelectBoxComponent   ||
           this._cmpRef.instance instanceof TerraSelectBoxComponent        ||
           this._cmpRef.instance instanceof TerraSuggestionBoxComponent)
        {
            this._cmpRef.instance.inputName = this.inputName;
        }
    }
}
