import { TerraNodeInterface } from './terra-node.interface';
import {
    isNull,
    isNullOrUndefined
} from 'util';
import { TranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core';

@Injectable()
export class TerraNodeTreeConfig<D>
{
    private _list:Array<TerraNodeInterface<D>> = [];
    private _currentSelectedNode:TerraNodeInterface<D>;

    constructor(public _translation:TranslationService)
    {

    }

    /**
     * @description Adds a node.
     * @param nodeToAdd The provided node to add to the tree.
     * @param parent Optional. The provided parent where nodeToAdd should be added to.
     * @param openParents Optional. Open all parents.
     */
    public addNode(nodeToAdd:TerraNodeInterface<D>, parent?:TerraNodeInterface<D>, openParents?:boolean):void
    {
        // check if the node to add is already added
        let alreadyAddedNode:TerraNodeInterface<D> = this.findNodeById(nodeToAdd.id);

        if(isNullOrUndefined(alreadyAddedNode))
        {
            // check children to set the parent correctly
            if(!isNullOrUndefined(nodeToAdd.children))
            {
                this.recursiveSetParent(nodeToAdd.children, nodeToAdd);
            }

            // add to first level if no parent nor current selected node is given
            if(isNullOrUndefined(this.currentSelectedNode) && isNullOrUndefined(parent))
            {
                this._list.push(nodeToAdd);
            }
            else
            {
                // set parent
                nodeToAdd.parent = !isNullOrUndefined(parent) ? parent : this.currentSelectedNode;

                // check children of parent to decide where to add the node
                if(isNullOrUndefined(nodeToAdd.parent.children))
                {
                    nodeToAdd.parent.children = [nodeToAdd];
                }
                else
                {
                    nodeToAdd.parent.children.push(nodeToAdd);
                }

                if(!isNullOrUndefined(openParents) && openParents)
                {
                    this.toggleOpenParent(nodeToAdd, openParents);
                }
            }
        }
        else
        {
            console.error('Node ' + nodeToAdd.name + ' with id ' + nodeToAdd.id + ' already added!');
        }
    }

    private getRecursiveNodePath(node:TerraNodeInterface<D>, name:string):string
    {
        if(!isNullOrUndefined(node))
        {
            if(isNullOrUndefined(name))
            {
                name = this._translation.translate(node.name);
            }
            else
            {
                name = this._translation.translate(node.name) + ' » ' + name;
            }

            if(!isNullOrUndefined(node.parent))
            {
                return this.getRecursiveNodePath(node.parent, name);
            }
            else
            {
                return name;
            }
        }

        return name;
    }

    /**
     * @description Adds a node to a given parentId.
     * @param parentId The identifier of the parent node.
     * @param node The node to be added.
     * @param openParents Optional. Open all parents.
     */
    public addChildToNodeById(parentId:string | number, node:TerraNodeInterface<D>, openParents?:boolean):void
    {
        let foundNode:TerraNodeInterface<D> = this.recursiveFindNodeById(this.list, parentId);

        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + parentId + ' not found!');
        }
        else
        {
            this.addNode(node, foundNode, openParents);
        }
    }

    /**
     * @description Adds a list of nodes to a given parentId.
     * @param parentId The identifier of the parent node.
     * @param nodeList The node list to be added.
     * @param openParents Optional. Open all parents.
     */
    public addChildrenToNodeById(parentId:string | number, nodeList:Array<TerraNodeInterface<D>>, openParents?:boolean):void
    {
        let foundNode:TerraNodeInterface<D> = this.recursiveFindNodeById(this.list, parentId);

        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + parentId + ' not found!');
        }
        else
        {
            nodeList.forEach((node:TerraNodeInterface<D>) =>
            {
                this.addNode(node, foundNode, openParents);
            });
        }
    }

    /**
     * @description Removes a given node.
     * @param node The node to be removed.
     */
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

    // removes a given node
    private internalRemoveNode(node:TerraNodeInterface<D>):void
    {
        let parent:TerraNodeInterface<D> = node.parent;

        if(!isNullOrUndefined(parent))
        {
            let index:number = parent.children.indexOf(node);

            parent.children.splice(index, 1);
        }

        if(node === this.currentSelectedNode)
        {
            this._currentSelectedNode = null;
        }
    }

    /**
     * @description Removes a node by ID.
     * @param id The ID of the node to be removed.
     */
    public removeNodeById(id:string | number):void
    {
        let foundNode:TerraNodeInterface<D> = this.recursiveFindNodeById(this.list, id);

        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + id + ' not found!');
        }
        else
        {
            this.internalRemoveNode(foundNode);
        }
    }

    /**
     * @description Updates a node by given ID.
     * @param id The ID of the node.
     * @param newNode The node with the new data.
     */
    public updateNodeById(id:string | number, newNode:TerraNodeInterface<D>):void
    {
        if(newNode.id.toString() !== id.toString())
        {
            console.warn('ID ' + id + ' is different from new node ID!');
        }

        // search for node
        let foundNode:TerraNodeInterface<D> = this.recursiveFindNodeById(this.list, id);

        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + id + ' not found!');
        }
        else
        {
            // just copy stuff
            foundNode.id = newNode.id;
            foundNode.name = newNode.name;
            foundNode.children = newNode.children;
            foundNode.icon = newNode.icon;
            foundNode.isActive = newNode.isActive;
            foundNode.isOpen = newNode.isOpen;
            foundNode.isVisible = newNode.isVisible;
            foundNode.defaultVisibility = newNode.defaultVisibility;
            foundNode.isLoading = newNode.isLoading;
            foundNode.tags = newNode.tags;
            foundNode.value = newNode.value;
            foundNode.parent = newNode.parent;
            foundNode.hasLoaded = newNode.hasLoaded;
            foundNode.onClick = newNode.onClick;
            foundNode.onLazyLoad = newNode.onLazyLoad;
        }
    }

    /**
     * @description Find an existing node by ID.
     * @param id The ID to find the correct node.
     */
    public findNodeById(id:string | number):TerraNodeInterface<D>
    {
        return this.recursiveFindNodeById(this.list, id);
    }

    /**
     * @description Find an existing node.
     * @param node The node to be found.
     */
    public findNode(node:TerraNodeInterface<D>):TerraNodeInterface<D>
    {
        return this.recursiveFindNode(this.list, node);
    }

    // find node
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

                if(!isNull(foundNode))
                {
                    break;
                }
            }
        }

        return foundNode;
    }

    // find node by id
    private recursiveFindNodeById(nodeList:Array<TerraNodeInterface<D>>, id:string | number):TerraNodeInterface<D>
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

                if(!isNull(foundNode))
                {
                    break;
                }
            }
        }

        return foundNode;
    }

    /**
     * @description The list with all the nodes.
     */
    public get list():Array<TerraNodeInterface<D>>
    {
        return this._list;
    }

    /**
     * @description Set a list with all the nodes.
     * @param value The node list to be shown.
     */
    public set list(value:Array<TerraNodeInterface<D>>)
    {
        this.recursiveSetParent(value);
        this._list = value;
    }

    // set parents to all nodes
    private recursiveSetParent(list:Array<TerraNodeInterface<D>>, parent?:TerraNodeInterface<D>):void
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

    /**
     * @description Open all parents of given node.
     * @param node The node to open its parents.
     * @param isOpen Toggle open or not.
     */
    public toggleOpenParent(node:TerraNodeInterface<D>, isOpen:boolean):void
    {
        if(!isNullOrUndefined(node.parent))
        {
            node.parent.isOpen = isOpen;

            this.toggleOpenParent(node.parent, isOpen);
        }
    }

    /**
     * @description Close all nodes.
     */
    public closeAllNodes():void
    {
        this.toggleOpenChildren(this.list, false);
    }

    /**
     * @description Open all parents of given node.
     * @param nodeList The node list to open its children.
     * @param isOpen Toggle open or not.
     */
    public toggleOpenChildren(nodeList:Array<TerraNodeInterface<D>>, isOpen:boolean):void
    {
        nodeList.forEach((node:TerraNodeInterface<D>) =>
        {
            node.isOpen = isOpen;

            if(!isNullOrUndefined(node.children))
            {
                this.toggleOpenChildren(node.children, isOpen);
            }
        });
    }

    /**
     * @description Call the lazy loading function of given node.
     * @param node The node where lazy loading is defined.
     */
    public handleLazyLoading(node:TerraNodeInterface<D>):void
    {
        // check if lazy loading is desired
        if(!node.hasLoaded && !isNullOrUndefined(node.onLazyLoad))
        {
            node.hasLoaded = true;
            node.isLoading = true;
            // subscribe to Observable
            node.onLazyLoad().subscribe(() =>
                {
                    node.hasLoaded = true;
                    node.isLoading = false;
                    node.isOpen = true;
                    this.setDefaultVisibilityToChildren(node.children);
                },
                () =>
                {
                    node.hasLoaded = false;
                    node.isLoading = false;
                });
        }
        else
        {
            node.isOpen = !node.isOpen;
        }
    }

    private setDefaultVisibilityToChildren(nodeList:Array<TerraNodeInterface<D>>):void
    {
        if(!isNullOrUndefined(nodeList))
        {
            nodeList.forEach((node:TerraNodeInterface<D>) =>
            {
                if(node.isVisible)
                {
                    node.defaultVisibility = true;
                }
                else
                {
                    node.defaultVisibility = false;
                }

                if(!isNullOrUndefined(node.children))
                {
                    this.setDefaultVisibilityToChildren(node.children);
                }
            });
        }
    }

    /**
     * @description Set a node as selected.
     * @param node The node to be set as selected.
     */
    public set currentSelectedNode(node:TerraNodeInterface<D>)
    {
        this.toggleOpenParent(node, true);
        this.recursiveSetNodeInactive(this.list);
        node.isActive = true;
        this._currentSelectedNode = node;
    }

    /**
     * @description Get the selected node.
     */
    public get currentSelectedNode():TerraNodeInterface<D>
    {
        return this._currentSelectedNode;
    }

    /**
     * @description Reset the entire tree.
     */
    public reset():void
    {
        this._list = [];
        this._currentSelectedNode = null;
    }

    /**
     * @description Set a node as selected by given ID.
     * @param id The ID to select a node.
     */
    public setCurrentSelectedNodeById(id:string | number):void
    {
        let foundNode:TerraNodeInterface<D> = this.recursiveFindNodeById(this.list, id);

        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + id + ' not found!');
        }
        else
        {
            this.currentSelectedNode = foundNode;
        }
    }

    // set all nodes inactive
    private recursiveSetNodeInactive(nodeList:Array<TerraNodeInterface<D>>):void
    {
        nodeList.forEach((node:TerraNodeInterface<D>) =>
        {
            node.isActive = false;

            if(!isNullOrUndefined(node.children) && node.children.length > 0)
            {
                this.recursiveSetNodeInactive(node.children);
            }
        });
    }

    /**
     * @description Toggle the visibility for all children.
     * @param nodeList The node list to toggle visibility of its children.
     * @param isVisible Toggle visibility.
     */
    public toggleVisiblityForAllChildren(nodeList:Array<TerraNodeInterface<D>>, isVisible:boolean):void
    {
        nodeList.forEach((node:TerraNodeInterface<D>) =>
        {
            node.isVisible = isVisible;

            if(!isNullOrUndefined(node.children))
            {
                this.toggleVisiblityForAllChildren(node.children, isVisible);
            }
        });
    }

    /**
     * @description Toggle the visibility for all parents.
     * @param parentNode The node to toggle visibility of its parent.
     * @param isVisible Toggle visibility.
     */
    public toggleVisibilityForAllParents(parentNode:TerraNodeInterface<D>, isVisible:boolean):void
    {
        parentNode.isVisible = isVisible;

        if(!isNullOrUndefined(parentNode.parent))
        {
            this.toggleVisibilityForAllParents(parentNode.parent, isVisible);
        }
    }
}
