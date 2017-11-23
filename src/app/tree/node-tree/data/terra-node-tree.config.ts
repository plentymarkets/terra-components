
import { TerraNodeInterface } from './terra-node.interface';
import { isNullOrUndefined } from 'util';
import { EventEmitter } from '@angular/core';

export class TerraNodeTreeConfig<D>
{
    private _list:Array<TerraNodeInterface<D>> = [];
    private _currentSelectedNode:TerraNodeInterface<D>;

    public addNode(nodeToAdd:TerraNodeInterface<D>, parent?:TerraNodeInterface<D>):void
    {
        let alreadyAddedNode:TerraNodeInterface<D> = this.findNodeById(nodeToAdd.id);

        if(isNullOrUndefined(alreadyAddedNode))
        {
            if(isNullOrUndefined(this.currentSelectedNode) && isNullOrUndefined(parent))
            {
                this._list.push(nodeToAdd);
            }
            else
            {
                nodeToAdd.parent = !isNullOrUndefined(parent) ? parent : this.currentSelectedNode;

                if(isNullOrUndefined(nodeToAdd.parent.children))
                {
                    nodeToAdd.parent.children = [nodeToAdd];
                }
                else
                {
                    nodeToAdd.parent.children.push(nodeToAdd);
                }
            }
        }
        else
        {
            console.error('Node ' + nodeToAdd.name + ' with id ' + nodeToAdd.id + ' already added!');
        }
    }

    public removeNode(node:TerraNodeInterface<D>):void
    {
        let foundNode:TerraNodeInterface<D> = this.recursiveFindNode(this.list, node);
        
        if(isNullOrUndefined(foundNode))
        {
           console.error('Node ' + node.name + ' with id ' + node.id + ' not found!');
        }
        else
        {
            this.internalRemoveNode(node);
        }
    }
    
    private internalRemoveNode(node:TerraNodeInterface<D>)
    {
        let parent:TerraNodeInterface<D> = node.parent;

        if(!isNullOrUndefined(parent))
        {
            let index:number = parent.children.indexOf(node);

            parent.children.splice(index, 1);
        }
    }
    
    public removeNodeById(id:string|number)
    {
        let foundNode:TerraNodeInterface<D> = this.recursiveFindNodeById(this.list, id);
    
        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + id + ' not found!');
        }
        else
        {
            this.internalRemoveNode(foundNode)
        }
    }

    public updateNodeById(id:string|number, newNode:TerraNodeInterface<D>):void
    {
        if(newNode.id.toString() !== id.toString())
        {
            console.warn('ID ' + id + ' is different from new node ID!');
        }
        
        let foundNode = this.recursiveFindNodeById(this.list, id);
    
        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + id + ' not found!');
        }
        else
        {
            foundNode.id = newNode.id;
            foundNode.name = newNode.name;
            foundNode.children = newNode.children;
            foundNode.icon = newNode.icon;
            foundNode.isActive = newNode.isActive;
            foundNode.isOpen = newNode.isOpen;
            foundNode.isVisible = newNode.isVisible;
            foundNode.value = newNode.value;
        }
    }

    public findNodeById(id:string|number):TerraNodeInterface<D>
    {
        return this.recursiveFindNodeById(this.list, id);
    }
    
    public findNode(node:TerraNodeInterface<D>):TerraNodeInterface<D>
    {
        return this.recursiveFindNode(this.list, node);
    }
    
    private recursiveFindNode(nodeList:Array<TerraNodeInterface<D>>, nodeToFind:TerraNodeInterface<D>):TerraNodeInterface<D>
    {
        let foundNode:TerraNodeInterface<D> = null;
        
        for(let node of nodeList)
        {
            if(node === nodeToFind)
            {
                foundNode = node;
            
                return foundNode;
            }
            else if(node.children)
            {
                foundNode = this.recursiveFindNode(node.children, nodeToFind);
            
                if(foundNode != null)
                {
                    break;
                }
            }
        }
    
        return foundNode;
    }
    
    private recursiveFindNodeById(nodeList:Array<TerraNodeInterface<D>>, id:string|number):TerraNodeInterface<D>
    {
        let foundNode:TerraNodeInterface<D> = null;
        
        for(let node of nodeList)
        {
            if(node.id.toString() === id.toString())
            {
                foundNode = node;
            
                return foundNode;
            }
            else if(node.children)
            {
                foundNode = this.recursiveFindNodeById(node.children, id);
            
                if(foundNode != null)
                {
                    break;
                }
            }
        }
    
        return foundNode;
    }

    public get list():Array<TerraNodeInterface<D>>
    {
        return this._list;
    }
    
    public set list(value:Array<TerraNodeInterface<D>>)
    {
        this.recursiveSetParent(value);
        this._list = value;
    }

    private recursiveSetParent(list:Array<TerraNodeInterface<D>>, parent?:TerraNodeInterface<D>)
    {
        for(let node of list)
        {
            if(!isNullOrUndefined(parent))
            {
                node.parent = parent;
            }

            if(!isNullOrUndefined(node.children))
            {
                this.recursiveSetParent(node.children, node);
            }
        }
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
    }
}