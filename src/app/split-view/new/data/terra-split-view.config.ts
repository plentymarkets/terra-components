import { TerraSplitViewIn } from './terra-split-view-in';
import { EventEmitter } from '@angular/core';

export class TerraSplitViewConfig
{
    private _views:Array<TerraSplitViewIn> = [];
    private _currentSelectedView:TerraSplitViewIn;
    
    private _addViewEventEmitter:EventEmitter<TerraSplitViewIn> = new EventEmitter<TerraSplitViewIn>();
    private _deleteViewEventEmitter:EventEmitter<TerraSplitViewIn> = new EventEmitter<TerraSplitViewIn>();
    
    public addView(view:TerraSplitViewIn):void
    {
        setTimeout(()=>{
            if(this.currentSelectedView == null)
            {
                this.views.push(view);
            }
            else
            {
                view.parentView = this.currentSelectedView;
                
                if (this.currentSelectedView.nextViews == null)
                {
                    this.currentSelectedView.nextViews = [];
                }
                
                
                for (let next of this.currentSelectedView.nextViews)
                {
                    let hasSameParameter:boolean = JSON.stringify(next.parameter) == JSON.stringify(view.parameter);
                    
                    if (hasSameParameter && next.module.ngModule == view.module.ngModule)
                    {
                        this.currentSelectedView.nextViews.push(view);
    
                        break;
                    }
                }
                
                
            }
    
            this.addViewEventEmitter.next(view);
        });
    }
    
    public reset():void
    {
        this._views = null;
        this._addViewEventEmitter.unsubscribe();
        this._addViewEventEmitter = new EventEmitter<TerraSplitViewIn>();
        this._deleteViewEventEmitter.unsubscribe();
        this._deleteViewEventEmitter = new EventEmitter<TerraSplitViewIn>();
    }
    public get deleteViewEventEmitter():EventEmitter<TerraSplitViewIn>
    {
        return this._deleteViewEventEmitter;
    }
    
    public get addViewEventEmitter():EventEmitter<TerraSplitViewIn>
    {
        return this._addViewEventEmitter;
    }
    
    public get views():Array<TerraSplitViewIn>
    {
        return this._views;
    }
    
    public get currentSelectedView():TerraSplitViewIn
    {
        return this._currentSelectedView;
    }
    
    public set currentSelectedView(value:TerraSplitViewIn)
    {
        this._currentSelectedView = value;
        
        this.recursiveSetSelected(value);
    }
    
    private recursiveSetSelected(view:TerraSplitViewIn)
    {
        view.isSelected = true;
        
        if(view.nextViews)
        {
            for(let next of view.nextViews)
            {
                this.recursiveSetSelected(next);
            }
        }
    }
}