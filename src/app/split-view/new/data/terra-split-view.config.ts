import { TerraSplitViewIn } from './terra-split-view-in';
import { EventEmitter } from '@angular/core';

export class TerraSplitViewConfig
{
    module:TerraSplitViewIn;
    
    eventEmitter:EventEmitter<TerraSplitViewIn> = new EventEmitter<TerraSplitViewIn>();
    
    public addView(view:TerraSplitViewIn):void
    {
        if(this.module)
        {
            let lastModule = this.findLastModule(this.module);
            if(lastModule.module.ngModule == view.module.ngModule)
            {
                if(lastModule.componentChildren == null)
                {
                    lastModule.componentChildren = [];
                }
                
                lastModule.componentChildren.push(view);
                this.eventEmitter.next(lastModule);
            }
            else
            {
                lastModule.nextModule = view;
                this.eventEmitter.next(view);
            }
        }
        else
        {
            this.module = view;
            this.eventEmitter.next(this.module);
        }
    }
    
    findLastModule(view:TerraSplitViewIn):TerraSplitViewIn
    {
        if(view.nextModule)
        {
            return this.findLastModule(view.nextModule);;
        }
        else
        {
            return view;
        }
    }
}