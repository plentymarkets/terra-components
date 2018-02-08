import { EventEmitter } from '@angular/core';
import { TerraMultiSplitViewInterface } from './terra-multi-split-view.interface';
import { isNullOrUndefined } from 'util';
import { TerraMultiSplitViewComponent } from '../terra-multi-split-view.component';

export class TerraMultiSplitViewConfig
{
    public currentSelectedView:TerraMultiSplitViewInterface;
    private _views:Array<TerraMultiSplitViewInterface> = [];

    private _selectBreadcrumbEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    public deleteViewEventEmitter:EventEmitter<TerraMultiSplitViewInterface> = new EventEmitter<TerraMultiSplitViewInterface>();
    private _splitViewComponent:TerraMultiSplitViewComponent;


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
                if(isNullOrUndefined(view.isBackgroundColorGrey))
                {
                    view.isBackgroundColorGrey = false;
                }

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
        this.resizeViewEventEmitter.next(view);
    }

    public setSelectedView(view:TerraMultiSplitViewInterface):void
    {
        this._setSelectedViewEventEmitter.next(view);
    }

    public reset():void
    {
        this._views = [];
        this._selectBreadcrumbEventEmitter.unsubscribe();
        this._selectBreadcrumbEventEmitter = new EventEmitter<TerraMultiSplitViewInterface>();
    }

    public get selectBreadcrumbEventEmitter():EventEmitter<TerraMultiSplitViewInterface>
    {
        return this._selectBreadcrumbEventEmitter;
    }

    public set splitViewComponent(value:TerraMultiSplitViewComponent)
    {
        this._splitViewComponent = value;
    }
}
