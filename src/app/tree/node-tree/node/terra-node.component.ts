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

    //to check if lazy loading has finished to avoid firing a REST-Call again
    private hasLoaded:boolean = false;
    private isLoading:boolean = false;

    constructor()
    {
    }

    //handle the node click
    protected onNodeClick(event:Event):void
    {
        event.stopPropagation();

        let doHandleInputNode:boolean = true;

        //check if lazy loading is desired
        if(!this.hasLoaded && !isNullOrUndefined(this.inputNode.onLazyLoad))
        {
            this.hasLoaded = true;
            this.isLoading = true;
            //subscribe to Observable
            this.inputNode.onLazyLoad().subscribe(() =>
                {
                    this.handleInputNode();
                    this.hasLoaded = true;
                    this.isLoading = false;
                },
                () =>
                {
                    this.hasLoaded = false;
                    this.isLoading = false;
                });
            doHandleInputNode = false;
        }

        //check if click function is set
        if(!isNullOrUndefined(this.inputNode.onClick))
        {
            this.inputNode.onClick();
        }

        if(doHandleInputNode)
        {
            this.handleInputNode();
        }
    }

    //do stuff with node
    private handleInputNode():void
    {
        this.inputConfig.currentSelectedNode = this.inputNode;
    }

    protected handleIconClick(event:Event):void
    {
        event.stopPropagation();
        this.inputNode.isOpen = !this.inputNode.isOpen;
    }
}