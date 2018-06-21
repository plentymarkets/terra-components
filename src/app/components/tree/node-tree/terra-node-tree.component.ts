import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TerraNodeTreeConfig } from './data/terra-node-tree.config';
import { isNullOrUndefined } from 'util';
import { TerraNodeInterface } from './data/terra-node.interface';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'terra-node-tree',
    styles:   [require('./terra-node-tree.component.scss')],
    template: require('./terra-node-tree.component.html')
})
export class TerraNodeTreeComponent<D> implements OnDestroy, OnInit
{
    /**
     * @description The config to handle actions on tree or node.
     */
    @Input()
    public inputConfig:TerraNodeTreeConfig<D>;

    /**
     * @description Shows the search box above the tree.
     */
    @Input()
    public inputShowSearch:boolean;

    /**
     * @description Disables or enables the System Tree
     */
    @Input()
    public isTreeDisabled:boolean;

    protected _searchValue:string;

    constructor(private _translation:TranslationService)
    {
    }

    public ngOnInit():void
    {
        this.inputConfig.checkVisibilityAndAssignDefault(this.inputConfig.list);
    }

    public ngOnDestroy():void
    {
        this.inputConfig.reset();
    }

    protected onChange():void
    {
        this.doSearch();

        if(this._searchValue.length === 0)
        {
            this.inputConfig.checkDefaultAndAssignVisibility(this.inputConfig.list);
            this.inputConfig.toggleOpenChildren(this.inputConfig.list, false);

            if(!isNullOrUndefined(this.inputConfig.currentSelectedNode))
            {
                this.inputConfig.toggleOpenParent(this.inputConfig.currentSelectedNode, true);
            }
        }
    }

    private doSearch():void
    {
        this.inputConfig.list.forEach((node:TerraNodeInterface<D>) =>
        {
            this.search(node, false);
        });
    }

    private search(node:TerraNodeInterface<D>, isParentVisible:boolean):boolean
    {
        // ignore non visible nodes
        if(!node.isVisible)
        {
            return;
        }

        let isVisible:boolean = isParentVisible || this.checkVisibility(node);
        let isEmptySearchString:boolean = isNullOrUndefined(this._searchValue) || this._searchValue.length === 0;

        let hasVisibleChild:boolean = false;
        let hasChildren:boolean = false;

        if(!isNullOrUndefined(node.children))
        {
            node.children.forEach((childNode:TerraNodeInterface<D>) =>
            {
                hasChildren = true;
                hasVisibleChild = this.search(childNode, isVisible) || hasVisibleChild;
            });
        }

        if(hasChildren)
        {
            if(!node.isOpen && !isEmptySearchString)
            {
                node.isOpen = true;
                this.inputConfig.toggleOpenChildren(node.children, true);
            }
            else if(isEmptySearchString)
            {
                node.isOpen = false;
            }
        }

        node.isVisible = isVisible || hasVisibleChild;

        return isVisible || hasVisibleChild;
    }

    private checkVisibility(node:TerraNodeInterface<D>):boolean
    {
        let hasValidCaptionOrTag:boolean = false;

        let tags:Array<string> = node.tags;

        // search for tags first
        if(!isNullOrUndefined(tags))
        {
            tags.forEach((tag:string) =>
            {
                if(tag.toUpperCase().includes(this._searchValue.toUpperCase()))
                {
                    hasValidCaptionOrTag = true;
                    return;
                }
            });
        }

        // search node names if no tags found
        if(!hasValidCaptionOrTag)
        {
            let name:string = this._translation.translate(node.name);

            let suggestion:string = name.toUpperCase();

            // check if search string is included in the given suggestion
            if(suggestion.includes(this._searchValue.toUpperCase()))
            {
                hasValidCaptionOrTag = true;
            }
        }

        return hasValidCaptionOrTag;
    }
}
