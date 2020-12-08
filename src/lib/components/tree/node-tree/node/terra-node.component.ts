import { Component, Inject, Input, OnInit } from '@angular/core';
import { TerraNodeInterface } from '../data/terra-node.interface';
import { TerraNodeTreeConfig } from '../data/terra-node-tree.config';
import { isNullOrUndefined } from 'util';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { TerraPlacementEnum } from '../../../../helpers/enums/terra-placement.enum';

/**
 * @deprecated since v5. Use mat-tree instead.
 */
@Component({
    selector: 'terra-node',
    styleUrls: ['./terra-node.component.scss'],
    templateUrl: './terra-node.component.html'
})
export class TerraNodeComponent<D> implements OnInit {
    /**
     * @description The node interface.
     */
    @Input()
    public inputNode: TerraNodeInterface<D>;

    /**
     * @description The config to handle actions on tree or node.
     */
    @Input()
    public inputConfig: TerraNodeTreeConfig<D>;

    public _tooltip: string;
    public _tooltipPlacement: string = TerraPlacementEnum.RIGHT;
    public _onlyEllipsisTooltip: boolean = true;

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {}

    public ngOnInit(): void {
        if (isNullOrUndefined(this.inputNode.tooltip)) {
            this._tooltip = this.inputNode.name;
        } else {
            this._tooltip = this.inputNode.tooltip;
        }

        if (!isNullOrUndefined(this.inputNode.tooltipOnlyEllipsis)) {
            this._onlyEllipsisTooltip = this.inputNode.tooltipOnlyEllipsis;
        }

        if (!isNullOrUndefined(this.inputNode.tooltipPlacement)) {
            this._tooltipPlacement = this.inputNode.tooltipPlacement;
        }
    }

    // handle the node click
    public _onNodeClick(event: Event): void {
        event.stopPropagation();

        this._handleOpenNode(false);

        // check if click function is set
        if (!isNullOrUndefined(this.inputNode.onClick)) {
            this.inputNode.onClick();
        }

        this.inputConfig.handleLazyLoading(this.inputNode);

        if (isNullOrUndefined(this.inputNode.selectable) || this.inputNode.selectable) {
            this.inputConfig.currentSelectedNode = this.inputNode;
        }
    }

    public _handleIconClick(event: Event): void {
        event.stopPropagation();

        this._handleOpenNode(true);

        this.inputConfig.handleLazyLoading(this.inputNode);
    }

    private _handleOpenNode(isIconClick: boolean): void {
        if (isIconClick || this.inputNode.closeOnClick) {
            this.inputNode.isOpen = !this.inputNode.isOpen;
        } else {
            this.inputNode.isOpen = true;
        }
    }
}
