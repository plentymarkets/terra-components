
import { TerraNodeInterface } from './terra-node.interface';
import { isNullOrUndefined } from 'util';
import { EventEmitter } from '@angular/core';

export class TerraNodeTreeConfig<D>
{
    private _list:Array<TerraNodeInterface<D>> = [];
    private _currentSelectedNode:TerraNodeInterface<D>;

    private _addNodeEventEmitter:EventEmitter<TerraNodeInterface<D>> = new EventEmitter<TerraNodeInterface<D>>();

    public addNode(node:TerraNodeInterface<D>, parent?:TerraNodeInterface<D>):void
    {
        if(isNullOrUndefined(parent))
        {
            this._list.push(node);
        }
        else
        {
            node.parent = parent;

            if(isNullOrUndefined(parent.children))
            {
                parent.children = [node];
            }
            else
            {
                parent.children.push(node);
            }
        }

        this.addNodeEventEmitter.next(node);
    }

    public removeNode(node:TerraNodeInterface<D>):void
    {

    }

    public updateNode(node:TerraNodeInterface<D>):void
    {

    }

    public get list():Array<TerraNodeInterface<D>>
    {
        return this._list;
    }

    public get addNodeEventEmitter():EventEmitter<TerraNodeInterface<D>>
    {
        return this._addNodeEventEmitter;
    }

    public set currentSelectedNode(value:TerraNodeInterface<D>)
    {
        this._currentSelectedNode = value;
    }

    public get currentSelectedNode():TerraNodeInterface<D>
    {
        return this._currentSelectedNode;
    }

    public reset():void
    {
        this._list = [];
        this._currentSelectedNode = null;
        this._addNodeEventEmitter.unsubscribe();
        this._addNodeEventEmitter = new EventEmitter<TerraNodeInterface<D>>();
    }
}