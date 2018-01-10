import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TerraNodeTreeConfig } from './data/terra-node-tree.config';
import {
    inspect,
    isNullOrUndefined
} from "util";
import { TerraNodeInterface } from './data/terra-node.interface';
import { TranslationService } from 'angular-l10n';
import * as Fuse from 'fuse.js';
import { FuseOptions } from 'fuse.js';

@Component({
    selector: 'terra-node-tree',
    styles:   [require('./terra-node-tree.component.scss')],
    template: require('./terra-node-tree.component.html')
})
export class TerraNodeTreeComponent<D> implements OnDestroy, OnInit
{
    private _doExecuteFuzzySearch:boolean;
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
        this.handleVisibility(this.inputConfig.list);
        this.recursiveTranslateName(this.inputConfig.list);
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

            if(this._doExecuteFuzzySearch)
            {
                this.doFuzzySearch(this.inputConfig.list);
            }
        }
        else
        {
            this.handleDefaultVisibility(this.inputConfig.list);
            this.inputConfig.closeAllNodes();
            this._doExecuteFuzzySearch = false;
        }
    }

    private recursiveCheckList(list:Array<TerraNodeInterface<D>>):void
    {
        list.forEach((node:TerraNodeInterface<D>) =>
        {
            //if(this._searchValue.includes(' '))
            //{
            //    this._searchValue.split(' ').forEach((word:string) =>
            //    {
            //        this.handleSearch(node, word);
            //    });
            //}
            //else
            //{
                this.handleSearch(node, this._searchValue);
            //}

            if(!isNullOrUndefined(node.children))
            {
                this.recursiveCheckList(node.children);
            }
        });
    }

    private doFuzzySearch(list:Array<TerraNodeInterface<D>>):void
    {
        let options:FuseOptions = {
            shouldSort:         true,
            findAllMatches: true,
            tokenize: true,
            threshold:          0.3,
            location:           0,
            distance:           100,
            maxPatternLength:   32,
            minMatchCharLength: 1,
            keys:               [
                "tags",
                "name"
            ]
        };

        //cache to discard circular keys (i.e. parent)
        let cache:Array<string> = [];

        let jsonString:string =  JSON.stringify(list, function (key, value) {
            if ((typeof value === 'undefined' ? 'undefined' : typeof(value)) === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });

        cache = null;

        let fuse:Fuse = new Fuse(JSON.parse(jsonString), options);

        let foundList:Array<TerraNodeInterface<D>> = fuse.search(this._searchValue);

        for(let node of foundList)
        {
            let fuzzyNode:TerraNodeInterface<D> = this.inputConfig.findNodeById(node.id);

            this.handleNodeVisibility(fuzzyNode);
        }

        for(let node of list)
        {
            if(!isNullOrUndefined(node.children))
            {
                this.doFuzzySearch(node.children);
            }
        }

        this._doExecuteFuzzySearch = false;
    }

    private recursiveTranslateName(list:Array<TerraNodeInterface<D>>):void
    {
        for(let node of list)
        {
            node.name = this._translation.translate(node.name);

            if(!isNullOrUndefined(node.children))
            {
                this.recursiveTranslateName(node.children);
            }
        }
    }

    private handleSearch(node:TerraNodeInterface<D>, value:string):void
    {
        let tagMatchFound:boolean = false;
        let tags:Array<string> = node.tags;
        if(!isNullOrUndefined(tags))
        {
            tags.forEach((tag:string) =>
            {
                if(tag.toUpperCase() === value.toUpperCase())
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

        //let name:string = this._translation.translate(node.name);

        let suggestion:string = node.name.toUpperCase();

        let suggestionMatch:boolean = false;

        // check if search string is included in the given suggestion
        if(suggestion === value.toUpperCase())
        {
            suggestionMatch = true;
            this.handleNodeVisibility(node);
        }

        this._doExecuteFuzzySearch = !suggestionMatch && !tagMatchFound;
    }

    private handleNodeVisibility(node:TerraNodeInterface<D>):void
    {
        if(!node.defaultVisibility)
        {
            return
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
