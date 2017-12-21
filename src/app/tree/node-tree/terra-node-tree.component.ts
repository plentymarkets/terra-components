import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TerraNodeTreeConfig } from './data/terra-node-tree.config';
import { isNullOrUndefined } from "util";
import { TerraNodeInterface } from './data/terra-node.interface';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'terra-node-tree',
    styles:   [require('./terra-node-tree.component.scss')],
    template: require('./terra-node-tree.component.html')
})
export class TerraNodeTreeComponent<D> implements OnDestroy, OnInit
{
    protected _searchValue:string;

    /**
     * @description The config to handle actions on tree or node.
     */
    @Input() inputConfig:TerraNodeTreeConfig<D>;

    /**
     * @description Shows the search box above the tree.
     */
    @Input() inputShowSearch:boolean;

    constructor(private _translation:TranslationService)
    {
    }

    public ngOnInit():void
    {
    }

    public ngOnDestroy():void
    {
        this.inputConfig.reset();
    }

    protected onChange():void
    {
        if(this._searchValue.length >= 3)
        {
            this.inputConfig.toggleVisiblityForAllChildren(this.inputConfig.list, false);

            this.recursiveCheckList(this.inputConfig.list);
        }
        else
        {
            this.inputConfig.toggleVisiblityForAllChildren(this.inputConfig.list, true);
            this.inputConfig.closeAllNodes();
        }
    }

    private recursiveCheckList(list:Array<TerraNodeInterface<D>>)
    {
        list.forEach((node:TerraNodeInterface<D>) =>
        {
            if(this._searchValue.includes(' '))
            {
                this._searchValue.split(' ').forEach((word:string) =>
                {
                    this.handleSearch(node, word);
                });
            }
            else
            {
                this.handleSearch(node, this._searchValue);
            }

            if(!isNullOrUndefined(node.children))
            {
                this.recursiveCheckList(node.children);
            }
        });
    }

    private handleSearch(node:TerraNodeInterface<D>, value:string):void
    {
        let tags:Array<string> = node.tags;
        if(!isNullOrUndefined(tags))
        {
            let tagMatchFound:boolean = false;
            tags.forEach((tag:string) =>
            {
                if(tag.toUpperCase().includes(value.toUpperCase()))
                {
                    tagMatchFound = true;
                    return;
                }
            });

            if(tagMatchFound)
            {
                this.handleNodeVisibility(node);
            }
        }

        let name:string = this._translation.translate(node.name);

        let suggestion:string = name.toUpperCase();

        // check if search string is included in the given suggestion
        if(suggestion.includes(value.toUpperCase()))
        {
            this.handleNodeVisibility(node);
        }
    }

    private handleNodeVisibility(node:TerraNodeInterface<D>)
    {
        node.isVisible = true;
        this.inputConfig.toggleOpenParent(node, true);

        this.inputConfig.handleLazyLoading(node);

        if(!isNullOrUndefined(node.children))
        {
            node.isOpen = true;
            this.inputConfig.toggleVisiblityForAllChildren(node.children, true);
        }

        if(!isNullOrUndefined(node.parent))
        {
            this.inputConfig.handleLazyLoading(node.parent);
            this.inputConfig.toggleVisibilityForAllParents(node.parent, true);
        }
    }
}
