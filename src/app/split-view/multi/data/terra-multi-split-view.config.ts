import { EventEmitter } from '@angular/core';
import { TerraMultiSplitViewInterface } from './terra-multi-split-view.interface';
import { isNullOrUndefined } from 'util';

export class TerraMultiSplitViewConfig
{
    private _views:Array<TerraMultiSplitViewInterface> = [];
    private _currentSelectedView:TerraMultiSplitViewInterface;

    private _addViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    private _deleteViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    private _resizeViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    private _selectBreadcrumbEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    private _setSelectedViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();

    public addView(view:TerraMultiSplitViewInterface, parent?:TerraMultiSplitViewInterface):void
    {
        if(view.parameter)
        {
            console.warn(
                'Property \'parameter\' is deprecated. It will be removed in one of the upcoming releases. Please use \'inputs\' instead.')
        }

        // TODO: setTimeout can be removed, if it is guaranteed that change detection is fired when adding a new view
        setTimeout(() =>
            {
                if(isNullOrUndefined(parent))
                {
                    if(isNullOrUndefined(this.currentSelectedView))
                    {
                        this.currentSelectedView = view;
                        this._views.push(view);
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
                            let hasSameParameter:boolean =
                                (child.parameter && view.parameter && JSON.stringify(child.parameter) === JSON.stringify(view.parameter)) ||
                                (child.inputs && view.inputs && JSON.stringify(child.inputs) === JSON.stringify(view.inputs)) ||
                                (child.name === view.name);

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

    public removeView(view:TerraMultiSplitViewInterface):void
    {
        if(isNullOrUndefined(view))
        {
            return;
        }

        let parent:TerraMultiSplitViewInterface = view.parent;

        let viewIndex:number = parent.children.findIndex((elem) => elem === view);

        if(viewIndex >= 0)
        {
            parent.children.splice(viewIndex, 1);
            this.deleteViewEventEmitter.next(view);
        }
    }

    public resizeView(view:TerraMultiSplitViewInterface, width:string):void
    {
        view.defaultWidth = width;
        this._resizeViewEventEmitter.next(view);
    }

    public setSelectedView(view:TerraMultiSplitViewInterface):void
    {
        this._setSelectedViewEventEmitter.next(view);
    }

    public reset():void
    {
        this._views = [];
        this._currentSelectedView = null;
        this._addViewEventEmitter.unsubscribe();
        this._addViewEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
        this._deleteViewEventEmitter.unsubscribe();
        this._deleteViewEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
        this._resizeViewEventEmitter.unsubscribe();
        this._resizeViewEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
        this._selectBreadcrumbEventEmitter.unsubscribe();
        this._selectBreadcrumbEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
        this._setSelectedViewEventEmitter.unsubscribe();
        this._setSelectedViewEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
    }

    public get deleteViewEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._deleteViewEventEmitter;
    }

    public get addViewEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._addViewEventEmitter;
    }

    public get currentSelectedView():TerraMultiSplitViewInterface
    {
        return this._currentSelectedView;
    }

    public set currentSelectedView(value:TerraMultiSplitViewInterface)
    {
        this._currentSelectedView = value;
    }

    public get resizeViewEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._resizeViewEventEmitter;
    }

    public set resizeViewEventEmitter(value:EventEmitter<TerraMultiSplitViewInterface>)
    {
        this._resizeViewEventEmitter = value;
    }

    public get selectBreadcrumbEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._selectBreadcrumbEventEmitter;
    }

    public get setSelectedViewEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._setSelectedViewEventEmitter;
    }
}
