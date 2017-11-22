import {
    Component,
    Input
} from '@angular/core';
import { TerraNodeInterface } from '../data/terra-node.interface';
import { TerraNodeTreeConfig } from '../data/terra-node-tree.config';
import { isNullOrUndefined } from 'util';

@Component({
               selector: 'terra-node',
               styles:   [require('./terra-node.component.scss')],
               template: require('./terra-node.component.html')
           })
export class TerraNodeComponent<D>
{
    @Input()
    inputNode:TerraNodeInterface<D>;

    @Input()
    inputConfig:TerraNodeTreeConfig<D>;

    constructor()
    {

    }

    protected onNodeClick():void
    {
        this.recursiveSetInactive(this.inputConfig.list);

        this.inputNode.isActive = true;
        //this.setParentActive(this.inputNode);
        this.inputConfig.currentSelectedNode = this.inputNode;
        this.inputNode.isOpen = !this.inputNode.isOpen;
    }

    //private setParentActive(node:TerraNodeInterface<D>):void
    //{
    //    if(!isNullOrUndefined(node.parent))
    //    {
    //        node.parent.isActive = true;
    //
    //        this.setParentActive(node.parent);
    //    }
    //}

    private recursiveSetInactive(nodeList:Array<TerraNodeInterface<D>>):void
    {
        nodeList.forEach((node:TerraNodeInterface<D>)=>{
            node.isActive = false;

            if(!isNullOrUndefined(node.children) && node.children.length > 0)
            {
                this.recursiveSetInactive(node.children);
            }
        });
    }
}