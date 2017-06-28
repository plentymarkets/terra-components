import { EventEmitter } from '@angular/core';
import { TerraSplitViewInterface } from './terra-split-view.interface';

export class TerraSplitViewConfig
{
    private _views:Array<TerraSplitViewInterface> = [];
    private _currentSelectedView:TerraSplitViewInterface;

    private _addViewEventEmitter:EventEmitter<TerraSplitViewInterface> = new EventEmitter<TerraSplitViewInterface>();
    private _deleteViewEventEmitter:EventEmitter<TerraSplitViewInterface> = new EventEmitter<TerraSplitViewInterface>();

    public addView(view:TerraSplitViewInterface, parent?:TerraSplitViewInterface):void
    {
        setTimeout(()=>{
            if(parent)
            {
                parent.children.push(view);
            }
            else
            {
                if(this.currentSelectedView == null)
                {
                    this.views.push(view);
                }
                else
                {
                    // add view to currently selected view's children
                    view.parent = this.currentSelectedView;

                    if (this.currentSelectedView.children == null)
                    {
                        this.currentSelectedView.children = [];
                        this.currentSelectedView.children.push(view);
                    }
                    else
                    {
                        for (let child of this.currentSelectedView.children)
                        {
                            let hasSameParameter:boolean = JSON.stringify(child.parameter) == JSON.stringify(view.parameter);

                            if (!(hasSameParameter && child.module.ngModule == view.module.ngModule))
                            {
                                this.currentSelectedView.children.push(view);

                                break;
                            }
                        }
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
        this._addViewEventEmitter = new EventEmitter<TerraSplitViewInterface>();
        this._deleteViewEventEmitter.unsubscribe();
        this._deleteViewEventEmitter = new EventEmitter<TerraSplitViewInterface>();
    }
    public get deleteViewEventEmitter():EventEmitter<TerraSplitViewInterface>
    {
        return this._deleteViewEventEmitter;
    }

    public get addViewEventEmitter():EventEmitter<TerraSplitViewInterface>
    {
        return this._addViewEventEmitter;
    }

    public get views():Array<TerraSplitViewInterface>
    {
        return this._views;
    }

    public set views(value:Array<TerraSplitViewInterface>)
    {
        this._views = value;
    }

    public get currentSelectedView():TerraSplitViewInterface
    {
        return this._currentSelectedView;
    }
    
    public set currentSelectedView(value:TerraSplitViewInterface)
    {
        this._currentSelectedView = value;
    }
}