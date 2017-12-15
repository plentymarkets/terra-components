import { TerraNodeInterface } from './terra-node.interface';
import { isNullOrUndefined } from 'util';
import { TerraSuggestionBoxValueInterface } from '../../../forms/suggestion-box/data/terra-suggestion-box.interface';
import { TranslationService } from 'angular-l10n';

export class TerraNodeTreeConfig<D>
{
    private _list:Array<TerraNodeInterface<D>> = [];
    private _currentSelectedNode:TerraNodeInterface<D>;
    private _searchNodeList:Array<TerraSuggestionBoxValueInterface> = [];

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
        //check if the node to add is already added
        let alreadyAddedNode:TerraNodeInterface<D> = this.findNodeById(nodeToAdd.id);

        if(isNullOrUndefined(alreadyAddedNode))
        {
            //check children to set the parent correctly
            if(!isNullOrUndefined(nodeToAdd.children))
            {
                this.recursiveSetParent(nodeToAdd.children, nodeToAdd);
            }

            //add to first level if no parent nor current selected node is given
            if(isNullOrUndefined(this.currentSelectedNode) && isNullOrUndefined(parent))
            {
                this._list.push(nodeToAdd);
            }
            else
            {
                //set parent
                nodeToAdd.parent = !isNullOrUndefined(parent) ? parent : this.currentSelectedNode;

                //check children of parent to decide where to add the node
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
                    this.recursiveOpenParent(nodeToAdd);
                }
            }

            this.addSearchNode(nodeToAdd);
        }
        else
        {
            console.error('Node ' + nodeToAdd.name + ' with id ' + nodeToAdd.id + ' already added!');
        }
    }

    private updateSearchNodes():void
    {
        // reset node list
        this._searchNodeList = [];

        // convert tree model into flat hierarchy
        this._list.forEach((node:TerraNodeInterface<D>) =>
        {
            this.addSearchNode(node);
        });
    }

    private addSearchNode(node:TerraNodeInterface<D>):void
    {
        // check for null pointer
        if(isNullOrUndefined(node))
        {
            return;
        }

        // seek trough its children, if existing
        if(!isNullOrUndefined(node.children) && node.children.length > 0)
        {
            node.children.forEach((child:TerraNodeInterface<D>) =>
            {
                this.addSearchNode(child);
            });
        }
        // only add nodes without children <=> leaves
        else
        {
            // check if node is visible
            if(!isNullOrUndefined(node.isVisible) && node.isVisible)
            {
                // add node to the flat list
                this._searchNodeList.push(
                    {
                        value:   node,
                        caption: this.getRecursiveNodePath(node, null)
                    }
                );
            }
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
        let foundNode = this.recursiveFindNodeById(this.list, parentId);

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
        let foundNode = this.recursiveFindNodeById(this.list, parentId);

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

    //removes a given node
    private internalRemoveNode(node:TerraNodeInterface<D>)
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
    public removeNodeById(id:string | number)
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

        //search for node
        let foundNode = this.recursiveFindNodeById(this.list, id);

        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + id + ' not found!');
        }
        else
        {
            //just copy stuff
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

    //find node
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

    //find node by id
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

                if(foundNode != null)
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
        this.updateSearchNodes();
    }

    //set parents to all nodes
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

    //open all parents of given node
    private recursiveOpenParent(node:TerraNodeInterface<D>)
    {
        if(!isNullOrUndefined(node.parent))
        {
            node.parent.isOpen = true;

            this.recursiveOpenParent(node.parent);
        }
    }

    /**
     * @description Set a node as selected.
     * @param node The node to be set as selected.
     */
    public set currentSelectedNode(node:TerraNodeInterface<D>)
    {
        this.recursiveOpenParent(node);
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
        this._searchNodeList = null;
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

    //set all nodes inactive
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
     *
     * @description A flat list of all nodes to be used with search box.
     */
    public get searchNodeList():Array<TerraSuggestionBoxValueInterface>
    {
        return this._searchNodeList;
    }
}
