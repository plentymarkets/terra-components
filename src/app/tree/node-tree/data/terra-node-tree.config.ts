
import { TerraNodeInterface } from './terra-node.interface';
import { isNullOrUndefined } from 'util';
import { EventEmitter } from '@angular/core';

export class TerraNodeTreeConfig
{
    private _list:Array<TerraNodeInterface> = [];
    private _currentSelectedNode:TerraNodeInterface;

    private _addNodeEventEmitter:EventEmitter<TerraNodeInterface> = new EventEmitter<TerraNodeInterface>();

    public addNode(node:TerraNodeInterface, parent?:TerraNodeInterface):void
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

    public removeNode(node:TerraNodeInterface):void
    {

    }

    public updateNode(node:TerraNodeInterface):void
    {

    }

    public get list():Array<TerraNodeInterface>
    {
        return this._list;
    }

    public get addNodeEventEmitter():EventEmitter<TerraNodeInterface>
    {
        return this._addNodeEventEmitter;
    }

    public set currentSelectedNode(value:TerraNodeInterface)
    {
        this._currentSelectedNode = value;
    }

    public get currentSelectedNode():TerraNodeInterface
    {
        return this._currentSelectedNode;
    }

    public reset():void
    {
        this._list = [];
        this._currentSelectedNode = null;
        this._addNodeEventEmitter.unsubscribe();
        this._addNodeEventEmitter = new EventEmitter<TerraNodeInterface>();
    }
}