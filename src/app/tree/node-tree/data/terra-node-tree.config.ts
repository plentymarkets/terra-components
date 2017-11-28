import { TerraNodeInterface } from './terra-node.interface';
import { isNullOrUndefined } from 'util';

export class TerraNodeTreeConfig<D>
{
    /**
     * @description The list full of nodes.
     */
    private _list:Array<TerraNodeInterface<D>> = [];

    /**
     * @description The current selected node.
     */
    private _currentSelectedNode:TerraNodeInterface<D>;

    /**
     * @description Adds a node.
     * @param nodeToAdd The provided node to add to the tree.
     * @param parent Optional. The provided parent where nodeToAdd should be added to.
     */
    public addNode(nodeToAdd:TerraNodeInterface<D>, parent?:TerraNodeInterface<D>):void
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

                nodeToAdd.parent.isOpen = true;
            }
        }
        else
        {
            console.error('Node ' + nodeToAdd.name + ' with id ' + nodeToAdd.id + ' already added!');
        }
    }

    /**
     * @description Adds a node to a given parentId.
     * @param parentId The identifier of the parent node.
     * @param node The node to be added.
     */
    public addChildToNodeById(parentId:string | number, node:TerraNodeInterface<D>):void
    {
        let foundNode = this.recursiveFindNodeById(this.list, parentId);

        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + parentId + ' not found!');
        }
        else
        {
            this.addNode(node, foundNode);
        }
    }

    /**
     * @description Adds a list of nodes to a given parentId.
     * @param parentId The identifier of the parent node.
     * @param nodeList The node list to be added.
     */
    public addChildrenToNodeById(parentId:string | number, nodeList:Array<TerraNodeInterface<D>>):void
    {
        let foundNode = this.recursiveFindNodeById(this.list, parentId);

        if(isNullOrUndefined(foundNode))
        {
            console.error('Node with id ' + parentId + ' not found!');
        }
        else
        {
            nodeList.forEach((node:TerraNodeInterface<D>)=>{
                this.addNode(node, foundNode);
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
            foundNode.isHidden = newNode.isHidden;
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
}