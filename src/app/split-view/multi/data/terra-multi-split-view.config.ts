import { EventEmitter } from '@angular/core';
import { TerraMultiSplitViewInterface } from './terra-multi-split-view.interface';
import { isNullOrUndefined } from 'util';

export class TerraMultiSplitViewConfig
{
    private _views:Array<TerraMultiSplitViewInterface> = [];
    private _currentSelectedView:TerraMultiSplitViewInterface;

    private _addViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    private _deleteViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    private _replaceViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();

    public addView(view:TerraMultiSplitViewInterface, parent?:TerraMultiSplitViewInterface):void
    {
        // TODO: setTimeout can be removed, if it is guaranteed that change detection is fired when adding a new view
        setTimeout(
            () =>
            {
                if(isNullOrUndefined(parent))
                {
                    if(isNullOrUndefined(this.currentSelectedView))
                    {
                        this.currentSelectedView = view;
                        this.views.push(view);
                    }
                    else
                    {
                        parent = this.currentSelectedView;
                    }
                }

                if(parent)
                {
                    view.parent = parent;

                    if(isNullOrUndefined(parent.children))
                    {
                        parent.children = [view];
                    }
                    else
                    {
                        let viewExist:boolean = false;

                        for(let child of parent.children)
                        {
                            // TODO very ugly way, maybe add an option to use an id?
                            let hasSameParameter:boolean = JSON.stringify(child.parameter) == JSON.stringify(view.parameter);

                            if(hasSameParameter && child.module.ngModule == view.module.ngModule)
                            {
                                view = child;
                                viewExist = true;
                                break;
                            }
                        }

                        if(!viewExist)
                        {
                            parent.children.push(view);
                        }
                    }
                }

                this.addViewEventEmitter.next(view);
            }
        );
    }

    public replaceViewsOfParent(view:TerraMultiSplitViewInterface, parent?:TerraMultiSplitViewInterface):void
    {
        // check if parameter is defined..
        if(isNullOrUndefined(view))
        {
            // return if undefined or null
            return;
        }

        // check if parent is defined
        if(isNullOrUndefined(parent))
        {
            // check if current selected view is already set
            if(isNullOrUndefined(this.currentSelectedView))
            {
                // set current selected view and push it to the views array
                this.currentSelectedView = view;
                this.views.push(view);
                // TODO: check if we can return here!? Double check of parent would be obsolete
            }
            else
            {
                // use current selected view as parent
                parent = this.currentSelectedView;
            }
        }

        // check if parent is defined
        if(parent)
        {
            // set the view's parent
            view.parent = parent;

            // reset children array
            parent.children = [];

            // add view to children array
            parent.children.push(view);

            // trigger event emitter
            this.replaceViewEventEmitter.next(view);
        }
    }

    public removeView(view:TerraMultiSplitViewInterface):void
    {
        let parent:TerraMultiSplitViewInterface = view.parent;

        let viewIndex:number = parent.children.findIndex((elem) => elem === view);

        if(viewIndex >= 0)
        {
            parent.children.splice(viewIndex, 1);
            this.deleteViewEventEmitter.next(view);
        }
    }

    public reset():void
    {
        this._views = null;
        this._addViewEventEmitter.unsubscribe();
        this._addViewEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
        this._deleteViewEventEmitter.unsubscribe();
        this._deleteViewEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
    }

    public get deleteViewEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._deleteViewEventEmitter;
    }

    public get addViewEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._addViewEventEmitter;
    }

    public get views():Array<TerraMultiSplitViewInterface>
    {
        return this._views;
    }

    public set views(value:Array<TerraMultiSplitViewInterface>)
    {
        this._views = value;
    }

    public get currentSelectedView():TerraMultiSplitViewInterface
    {
        return this._currentSelectedView;
    }

    public set currentSelectedView(value:TerraMultiSplitViewInterface)
    {
        this._currentSelectedView = value;
    }

    public get replaceViewEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._replaceViewEventEmitter;
    }

    public set replaceViewEventEmitter(value:EventEmitter<TerraMultiSplitViewInterface>)
    {
        this._replaceViewEventEmitter = value;
    }
}
