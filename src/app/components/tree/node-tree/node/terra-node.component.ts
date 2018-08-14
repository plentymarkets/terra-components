import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraNodeInterface } from '../data/terra-node.interface';
import { TerraNodeTreeConfig } from '../data/terra-node-tree.config';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-node',
    styles:   [require('./terra-node.component.scss')],
    template: require('./terra-node.component.html')
})
export class TerraNodeComponent<D> implements OnInit
{
    /**
     * @description The node interface.
     */
    @Input()
    public inputNode:TerraNodeInterface<D>;

    /**
     * @description The config to handle actions on tree or node.
     */
    @Input()
    public inputConfig:TerraNodeTreeConfig<D>;

    protected tooltip:string;
    protected tooltipPlacement:string = 'right';

    public ngOnInit():void
    {
        if(!this.inputNode.tooltip)
        {
            this.tooltip = this.inputNode.name;
        }
        else
        {
            this.tooltip = this.inputNode.tooltip;
        }
        if(this.inputNode.tooltipPlacement)
        {
            this.tooltipPlacement = this.inputNode.tooltipPlacement;
        }

    }

    // handle the node click
    protected onNodeClick(event:Event):void
    {
        event.stopPropagation();

        // check if click function is set
        if(!isNullOrUndefined(this.inputNode.onClick))
        {
            this.inputNode.onClick();
        }

        this.inputConfig.handleLazyLoading(this.inputNode);

        this.inputConfig.currentSelectedNode = this.inputNode;
    }

    protected handleIconClick(event:Event):void
    {
        event.stopPropagation();

        this.inputConfig.handleLazyLoading(this.inputNode);
    }
}
