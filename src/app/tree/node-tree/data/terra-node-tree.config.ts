
import { TerraNodeInterface } from './terra-node.interface';
import { isNullOrUndefined } from 'util';
import { EventEmitter } from '@angular/core';

export class TerraNodeTreeConfig<D>
{
    private _list:Array<TerraNodeInterface<D>> = [];
    private _currentSelectedNode:TerraNodeInterface<D>;

    private _addNodeEventEmitter:EventEmitter<TerraNodeInterface<D>> = new EventEmitter<TerraNodeInterface<D>>();

    public addNode(nodeToAdd:TerraNodeInterface<D>, parent?:TerraNodeInterface<D>):void
    {
        let alreadyAddedNode:TerraNodeInterface<D> = this.findNodeById(nodeToAdd.id);

        if(isNullOrUndefined(alreadyAddedNode))
        {
            if(isNullOrUndefined(parent))
            {
                this._list.push(nodeToAdd);
            }
            else
            {
                nodeToAdd.parent = parent;

                if(isNullOrUndefined(parent.children))
                {
                    parent.children = [nodeToAdd];
                }
                else
                {
                    parent.children.push(nodeToAdd);
                }
            }

            this.addNodeEventEmitter.next(nodeToAdd);
        }
        else
        {
            console.error('Node with id ' + nodeToAdd.id + ' already added!');
        }
    }

    public removeNode(node:TerraNodeInterface<D>):void
    {

    }

    public updateNode(node:TerraNodeInterface<D>):void
    {

    }

    public findNodeById(id:string|number):TerraNodeInterface<D>
    {
        return this._list.find((node:TerraNodeInterface<D>)=>{
            return node.id.toString() === id.toString();
        });
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