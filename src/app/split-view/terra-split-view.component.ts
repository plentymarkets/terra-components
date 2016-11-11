import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    ViewChild,
    ComponentRef,
    ComponentFactoryResolver,
    ChangeDetectorRef,
    ViewContainerRef
} from '@angular/core';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';
import { TerraDclWrapperComponent } from '../dcl-wrapper/terra-dcl-wrapper.component';

@Component({
               selector: 'terra-split-view',
               styles:   [require('./terra-split-view.component.scss').toString()],
               template: require('./terra-split-view.component.html')
           })
export class TerraSplitViewComponent implements OnInit, OnChanges
{
    @Input() inputComponents:Array<TerraSplitViewInterface>;
    @Input() inputType;
    @Output() outputClose = new EventEmitter<any>();
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
    
    ngOnChanges()
    {
        
    }
    
    private onClick(component:TerraSplitViewInterface):void
    {
        this.inputComponents.forEach
        (
            (comp) =>
            {
                if(comp === component)
                {
                    //this.hideView(component);
                    this.inputComponents.pop();
                }
            }
        )
        //this.hideView(component);
    }
    
    private hideView(component:TerraSplitViewInterface):void
    {
        component.hidden = true;
    }
}
