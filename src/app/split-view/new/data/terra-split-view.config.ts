import { EventEmitter } from '@angular/core';
import { TerraSplitViewInterface } from './terra-split-view.interface';
import { isNullOrUndefined } from 'util';

export class TerraSplitViewConfig
{
    private _views:Array<TerraSplitViewInterface> = [];
    private _currentSelectedView:TerraSplitViewInterface;

    private _addViewEventEmitter:EventEmitter<TerraSplitViewInterface> = new EventEmitter<TerraSplitViewInterface>();
    private _deleteViewEventEmitter:EventEmitter<TerraSplitViewInterface> = new EventEmitter<TerraSplitViewInterface>();

    public addView(view:TerraSplitViewInterface, parent?:TerraSplitViewInterface):void
    {
        setTimeout(()=>{
            if (isNullOrUndefined(parent))
            {
                if (isNullOrUndefined(this.currentSelectedView))
                {
                    this.views.push(view);
                }
                else
                {
                    parent = this.currentSelectedView;
                }
            }

            if (parent)
            {
                view.parent = parent;

                if (isNullOrUndefined(parent.children))
                {
                    parent.children = [view]
                }
                else
                {
                    let viewExist:boolean = false;

                    for (let child of parent.children)
                    {
                        // TODO very ugly way, maybe add an option to use an id?
                        let hasSameParameter:boolean = JSON.stringify(child.parameter) == JSON.stringify(view.parameter);

                        if (hasSameParameter && child.module.ngModule == view.module.ngModule)
                        {
                            view = child;
                            viewExist = true;
                            break;
                        }
                    }

                    if (!viewExist)
                    {
                        parent.children.push(view);
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