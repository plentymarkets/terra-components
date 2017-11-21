import {
    Component,
    Input
} from '@angular/core';
import { TerraNodeInterface } from '../data/terra-node.interface';
import { TerraButtonComponent } from '../../../button/terra-button.component';
import { TerraNodeTreeConfig } from '../data/terra-node-tree.config';

@Component({
               selector: 'terra-node',
               styles:   [require('./terra-node.component.scss')],
               template: require('./terra-node.component.html')
           })
export class TerraNodeComponent
{
    @Input()
    inputNode:TerraNodeInterface;

    @Input()
    inputConfig:TerraNodeTreeConfig;

    constructor()
    {

    }

    protected onNodeClick():void
    {
        this.inputNode.isActive = true;
        this.inputConfig.currentSelectedNode = this.inputNode;
        this.inputNode.isOpen = !this.inputNode.isOpen;
    }
}