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
            this.recursiveUnselectViews(this._firstView);
            view.isSelected = true;
            
            let existingView:TerraSplitViewIn = this.recursiveFindViewByModule(view, this.firstView);
            
            if(existingView == null)
            {
                if(this.firstView.nextViews == null)
                {
                    this.firstView.nextViews = [];
                }
    
                this.firstView.nextViews.push(view);
                this.addViewEventEmitter.next(view);
            }
            else
            {
                if(existingView.nextViews == null)
                {
                    existingView.nextViews = [];
                }
    
                existingView.nextViews.push(view);
                this.addViewEventEmitter.next(view);
            }
            
            //let existingView:TerraSplitViewIn = this.recursiveFindViewByModule(view, this._firstView);
            //
            //if(existingView == null)
            //{
            //    let lastView:TerraSplitViewIn = this.findLastView(this._firstView);
            //
            //    if(lastView.module.ngModule == view.module.ngModule)
            //    {
            //        if(lastView.componentChildren == null)
            //        {
            //            lastView.componentChildren = [];
            //        }
            //
            //        lastView.componentChildren.push(view);
            //        view.parentView = lastView;
            //        this.addViewEventEmitter.next(lastView);
            //    }
            //    else
            //    {
            //        lastView.nextView = view;
            //        view.parentView = lastView;
            //        this.addViewEventEmitter.next(view);
            //    }
            //}
            //else
            //{
            //    if(existingView.module.ngModule == view.module.ngModule)
            //    {
            //        if(existingView.componentChildren == null)
            //        {
            //            existingView.componentChildren = [];
            //        }
            //
            //        if(existingView.nextView)
            //        {
            //            this.deleteView(existingView.nextView);
            //        }
            //
            //        if(!this.childExists(view, existingView) && this.findViewByInstanceKey(existingView.instanceKey) != null)
            //        {
            //            existingView.componentChildren.push(view);
            //        }
            //
            //        view.parentView = existingView;
            //        this.addViewEventEmitter.next(existingView);
            //    }
            //    else
            //    {
            //        existingView.nextView = view;
            //        view.parentView = existingView;
            //        this.addViewEventEmitter.next(view);
            //    }
            //}
        }
        else
        {
            this._firstView = view;
            this._firstView.isSelected;
            this.addViewEventEmitter.next(this._firstView);
        }
    }
    
    private recursiveUnselectViews(view:TerraSplitViewIn)
    {
        if(view.nextViews)
        {
            for(let next of view.nextViews)
            {
                next.isSelected = false;
                
                if(next.nextViews)
                {
                    this.recursiveUnselectViews(next);
                }
            }
        }
    }
    
    public getViewByInstanceKey(instanceKey:string):TerraSplitViewIn
    {
        return this.recursiveGetViewByInstanceKey(instanceKey, this._firstView);
    }
    
    private recursiveGetViewByInstanceKey(instanceKey:string, view:TerraSplitViewIn):TerraSplitViewIn
    {
        if(view.instanceKey == instanceKey)
        {
            return view;
        }
        else
        {
            if(view.nextViews)
            {
                for(let nextView of view.nextViews)
                {
                    this.recursiveGetViewByInstanceKey(instanceKey, nextView);
                }
            }
        }
        
        return null;
    }
    
    //private childExists(viewToFind:TerraSplitViewIn, viewToCompare:TerraSplitViewIn):boolean
    //{
    //    let viewFound:boolean = false;
    //
    //    if(viewToCompare.componentChildren)
    //    {
    //        for(let view of viewToCompare.componentChildren)
    //        {
    //            if(view.module.ngModule == viewToFind.module.ngModule && view.instanceKey == viewToFind.instanceKey)
    //            {
    //                viewFound = true;
    //                break;
    //            }
    //        }
    //    }
    //
    //    return viewFound;
    //}
    //
    private recursiveFindViewByModule(viewToFind:TerraSplitViewIn, viewToCompare:TerraSplitViewIn):TerraSplitViewIn
    {
        if(viewToFind.module.ngModule == viewToCompare.module.ngModule)
        {
            return viewToCompare;
        }
        else
        {
            if(viewToCompare.nextViews)
            {
                for(let nextView of viewToCompare.nextViews)
                {
                   let foundView = this.recursiveFindViewByModule(viewToFind, nextView);
                   if(foundView)
                   {
                       return foundView;
                   }
                }
            }
        }
    }
    //
    //public findLastView(view:TerraSplitViewIn):TerraSplitViewIn
    //{
    //    if(view.nextView)
    //    {
    //        return this.findLastView(view.nextView);;
    //    }
    //    else
    //    {
    //        return view;
    //    }
    //}
    //
    //public getLastModule():TerraSplitViewIn
    //{
    //    return this.findLastView(this.firstView);
    //}
    
    public reset():void
    {
        this._firstView = null;
        this._addViewEventEmitter.unsubscribe();
        this._addViewEventEmitter = new EventEmitter<TerraSplitViewIn>();
        this._deleteViewEventEmitter.unsubscribe();
        this._deleteViewEventEmitter = new EventEmitter<TerraSplitViewIn>();
    }
    
    //public findViewByInstanceKey(instanceKey:string):TerraSplitViewIn
    //{
    //    return this.findViewRecursiveByInstanceKey(this._firstView, instanceKey);
    //}
    //
    //private findViewRecursiveByInstanceKey(view:TerraSplitViewIn, key:string):TerraSplitViewIn
    //{
    //    if(view.instanceKey != null && view.instanceKey == key)
    //    {
    //        return view;
    //    }
    //    else
    //    {
    //        if(view.nextView != null)
    //        {
    //            return this.findViewRecursiveByInstanceKey(view.nextView, key);
    //        }
    //    }
    //
    //    return null;
    //}
    //
    //public deleteViewByInstanceKey(instanceKey:string)
    //{
    //    let view:TerraSplitViewIn = this.findViewByInstanceKey(instanceKey);
    //
    //    this.deleteView(view);
    //}
    //
    //public deleteView(viewToDelete:TerraSplitViewIn):void
    //{
    //    if(viewToDelete.parentView != null)
    //    {
    //        viewToDelete.parentView.nextView = null;
    //
    //        this.deleteViewEventEmitter.next(viewToDelete);
    //    }
    //}
    
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