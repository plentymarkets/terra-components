import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraNodeInterface } from '../data/terra-node.interface';
import { TerraNodeTreeConfig } from '../data/terra-node-tree.config';
import { isNullOrUndefined } from 'util';
import { Language } from 'angular-l10n';

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

    @Language()
    protected lang:string;

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

        this.handleOpenNode(false);

        // check if click function is set
        if(!isNullOrUndefined(this.inputNode.onClick))
        {
            this.inputNode.onClick();
        }

        this.inputConfig.handleLazyLoading(this.inputNode);

        if(isNullOrUndefined(this.inputNode.selectable) || this.inputNode.selectable)
        {
            this.inputConfig.currentSelectedNode = this.inputNode;
        }
    }

    protected handleIconClick(event:Event):void
    {
        event.stopPropagation();

        this.handleOpenNode(true);

        this.inputConfig.handleLazyLoading(this.inputNode);
    }

    private handleOpenNode(isIconClick:boolean):void
    {
        if(isIconClick || this.inputNode.closeOnClick)
        {
            this.inputNode.isOpen = !this.inputNode.isOpen;
        }
        else
        {
            this.inputNode.isOpen = true;
        }
    }
}
