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

    protected _searchValue:string;

    constructor(private _translation:TranslationService)
    {
    }

    public ngOnInit():void
    {
        this.handleVisibility(this.inputConfig.list);
    }

    private handleVisibility(nodeList:Array<TerraNodeInterface<D>>):void
    {
        nodeList.forEach((node:TerraNodeInterface<D>) =>
        {

            if(node.isVisible)
            {
                node.defaultVisibility = true;
            }
            else
            {
                node.defaultVisibility = false;
            }

            if(!isNullOrUndefined(node.children))
            {
                this.handleVisibility(node.children);
            }
        });
    }

    private handleDefaultVisibility(nodeList:Array<TerraNodeInterface<D>>):void
    {
        nodeList.forEach((node:TerraNodeInterface<D>) =>
        {

            if(node.defaultVisibility)
            {
                node.isVisible = true;
            }
            else
            {
                node.isVisible = false;
            }

            if(!isNullOrUndefined(node.children))
            {
                this.handleDefaultVisibility(node.children);
            }
        });
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
            this.handleDefaultVisibility(this.inputConfig.list);
            this.inputConfig.closeAllNodes();
        }
    }

    private recursiveCheckList(list:Array<TerraNodeInterface<D>>):void
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

    private handleNodeVisibility(node:TerraNodeInterface<D>):void
    {
        if(!node.defaultVisibility)
        {
            return;
        }

        node.isVisible = true;
        this.inputConfig.toggleOpenParent(node, true);

        if(!node.hasLoaded && !isNullOrUndefined(node.onLazyLoad))
        {
            this.inputConfig.handleLazyLoading(node);
        }

        if(!isNullOrUndefined(node.children))
        {
            this.inputConfig.toggleVisiblityForAllChildren(node.children, true);
        }

        if(!isNullOrUndefined(node.parent))
        {
            if(!node.parent.hasLoaded && !isNullOrUndefined(node.parent.onLazyLoad))
            {
                this.inputConfig.handleLazyLoading(node.parent);
            }
            this.inputConfig.toggleVisibilityForAllParents(node.parent, true);
        }
    }
}
