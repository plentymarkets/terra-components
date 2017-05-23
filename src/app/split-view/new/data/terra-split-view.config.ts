import { TerraSplitViewIn } from './terra-split-view-in';
import { EventEmitter } from '@angular/core';

export class TerraSplitViewConfig
{
    private _firstView:TerraSplitViewIn;
    
    private _addViewEventEmitter:EventEmitter<TerraSplitViewIn> = new EventEmitter<TerraSplitViewIn>();
    private _deleteViewEventEmitter:EventEmitter<TerraSplitViewIn> = new EventEmitter<TerraSplitViewIn>();
    
    public addView(view:TerraSplitViewIn):void
    {
        if(this._firstView)
        {
            let lastView = this.findLastView(this._firstView);
            if(lastView.module.ngModule == view.module.ngModule)
            {
                if(lastView.componentChildren == null)
                {
                    lastView.componentChildren = [];
                }
                
                lastView.componentChildren.push(view);
                view.parentView = lastView;
                this.addViewEventEmitter.next(lastView);
            }
            else
            {
                lastView.nextView = view;
                view.parentView = lastView;
                this.addViewEventEmitter.next(view);
            }
        }
        else
        {
            this._firstView = view;
            this.addViewEventEmitter.next(this._firstView);
        }
    }
    
    public findLastView(view:TerraSplitViewIn):TerraSplitViewIn
    {
        if(view.nextView)
        {
            return this.findLastView(view.nextView);;
        }
        else
        {
            return view;
        }
    }
    
    public reset():void
    {
        this._firstView = null;
        this._addViewEventEmitter.unsubscribe();
        this._addViewEventEmitter = new EventEmitter<TerraSplitViewIn>();
        this._deleteViewEventEmitter.unsubscribe();
        this._deleteViewEventEmitter = new EventEmitter<TerraSplitViewIn>();
    }
    
    public findViewByInstanceKey(instanceKey:string):TerraSplitViewIn
    {
        return this.findViewRecursiveByInstanceKey(this._firstView, instanceKey);
    }
    
    private findViewRecursiveByInstanceKey(view:TerraSplitViewIn, key:string):TerraSplitViewIn
    {
        if(view.instanceKey != null && view.instanceKey == key)
        {
            return view;
        }
        else
        {
            if(view.nextView != null)
            {
                return this.findViewRecursiveByInstanceKey(view.nextView, key);
            }
        }
        
        return null;
    }
    
    public deleteViewByInstanceKey(instanceKey:string)
    {
        let view:TerraSplitViewIn = this.findViewByInstanceKey(instanceKey);
        
        this.deleteView(view);
    }
    
    public deleteView(viewToDelete:TerraSplitViewIn):void
    {
        if(viewToDelete.parentView != null)
        {
            viewToDelete.parentView.nextView = null;
            
            this.deleteViewEventEmitter.next(viewToDelete);
        }
    }
    
    public get deleteViewEventEmitter():EventEmitter<TerraSplitViewIn>
    {
        return this._deleteViewEventEmitter;
    }
    
    public get addViewEventEmitter():EventEmitter<TerraSplitViewIn>
    {
        return this._addViewEventEmitter;
    }
    
    public get firstView():TerraSplitViewIn
    {
        return this._firstView;
    }
}