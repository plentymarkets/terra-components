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
        let doStuff:boolean = true;

        if(!isNullOrUndefined(this.inputNode.onLazyLoad))
        {
            this.inputNode.onLazyLoad().subscribe(()=>{
                this.handleInputNode();
            });
            doStuff = false;
        }

        if(!isNullOrUndefined(this.inputNode.onClick))
        {
            this.inputNode.onClick();
            this.handleInputNode();
            doStuff = false;
        }

        if(doStuff)
        {
            this.handleInputNode();
        }

    }

    handleInputNode()
    {


        this.inputNode.isActive = true;
        this.inputConfig.currentSelectedNode = this.inputNode;

    }

    handleIconClick()
    {
        this.recursiveSetInactive(this.inputConfig.list);
        this.inputNode.isOpen = !this.inputNode.isOpen;
    }

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