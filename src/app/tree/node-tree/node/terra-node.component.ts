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
    /**
     * @description The node interface.
     */
    @Input() inputNode:TerraNodeInterface<D>;

    /**
     * @description The config to handle actions on tree or node.
     */
    @Input() inputConfig:TerraNodeTreeConfig<D>;

    private isLoading:boolean = false;

    constructor()
    {
    }

    //handle the node click
    protected onNodeClick(event:Event):void
    {
        event.stopPropagation();

        //check if click function is set
        if(!isNullOrUndefined(this.inputNode.onClick))
        {
            this.inputNode.onClick();
        }

        this.inputConfig.currentSelectedNode = this.inputNode;
    }

    protected handleIconClick(event:Event):void
    {
        event.stopPropagation();

        //check if lazy loading is desired
        if(!this.inputNode.hasLoaded && !isNullOrUndefined(this.inputNode.onLazyLoad))
        {
            this.inputNode.hasLoaded = true;
            this.isLoading = true;
            //subscribe to Observable
            this.inputNode.onLazyLoad().subscribe(() =>
                {
                    this.inputNode.hasLoaded = true;
                    this.isLoading = false;
                    this.inputNode.isOpen = true;
                },
                () =>
                {
                    this.inputNode.hasLoaded = false;
                    this.isLoading = false;
                });
        }
        else
        {
            this.inputNode.isOpen = !this.inputNode.isOpen;
        }
    }
}
