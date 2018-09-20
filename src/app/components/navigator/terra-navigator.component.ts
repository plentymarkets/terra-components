import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { TerraNavigatorSplitViewConfig } from './config/terra-navigator-split-view.config';
import { TerraNavigatorNodeInterface } from './data/terra-navigator-node.interface';
import { TerraButtonGroupModule } from './button-group/terra-button-group.module';
import { TerraNavigatorConfig } from './config/terra-navigator.config';
import {
    isNull,
    isNullOrUndefined,
    isUndefined
} from 'util';
import { TerraSuggestionBoxValueInterface } from '../forms/suggestion-box/data/terra-suggestion-box.interface';
import { Router } from '@angular/router';
import { TranslationService } from 'angular-l10n';

/**
 * @author mscharf
 */
@Component({
    selector: 'terra-navigator',
    template: require('./terra-navigator.component.html'),
    styles:   [
        require('./terra-navigator.component.scss'),
        require('./terra-navigator.component.glob.scss').toString()
    ],
})
export class TerraNavigatorComponent<D> implements OnInit, OnChanges
{
    @Input()
    public inputNodes:Array<TerraNavigatorNodeInterface<D>>;

    @Input()
    public inputNavigatorService:TerraNavigatorConfig<D>;

    @Input()
    public inputModuleWidth:string;

    @Input()
    public inputFirstBreadcrumbName:string;

    @Input()
    public inputRouter:Router;

    @Input()
    public inputBaseRoute:string;

    @Output()
    public outputEndpointClicked:EventEmitter<TerraNavigatorNodeInterface<D>>;

    @Output()
    public outputNodeClicked:EventEmitter<TerraNavigatorNodeInterface<D>>;

    private isInit:boolean;
    private _searchNodeList:Array<TerraSuggestionBoxValueInterface>;

    constructor(protected terraNavigatorSplitViewConfig:TerraNavigatorSplitViewConfig<D>, private translation:TranslationService)
    {
        this.isInit = false;
        this.outputEndpointClicked = new EventEmitter();
        this.outputNodeClicked = new EventEmitter();
        this._searchNodeList = [];
    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputModuleWidth))
        {
            this.inputModuleWidth = 'col-xs-12 col-md-12 col-lg-12';
        }

        if(!isNullOrUndefined(this.inputNodes))
        {
            this.initRootPaths(this.inputNodes, null);
            this.refreshNodeVisibilities(this.inputNodes);

            if(isNull(this.inputFirstBreadcrumbName) || this.inputFirstBreadcrumbName === '')
            {
                console.error('You have to define an initial breadcrumb!!!');
            }

            this.terraNavigatorSplitViewConfig.addModule({
                module:                TerraButtonGroupModule.forRoot(),
                instanceKey:           0,
                defaultWidth:          this.inputModuleWidth,
                hidden:                false,
                name:                  this.inputFirstBreadcrumbName,
                mainComponentName:     'TerraButtonGroupComponent',
                parameter:             {
                    nodes: this.inputNodes
                }
            });
        }

        this.terraNavigatorSplitViewConfig.observableNodeClicked.subscribe((item:TerraNavigatorNodeInterface<D>) =>
        {
            if(isNullOrUndefined(item.rootPath))
            {
                this.initRootPaths(this.inputNodes, null);
            }

            this.outputNodeClicked.emit(item);

            if(!isNullOrUndefined(item.children))
            {
                this.terraNavigatorSplitViewConfig.modules[0].defaultWidth = 'col-xs-6 col-md-6 col-lg-6';

                this.terraNavigatorSplitViewConfig
                    .addModule({
                        module:                TerraButtonGroupModule.forRoot(),
                        instanceKey:           item.rootPath.length,
                        defaultWidth:          'col-xs-6 col-md-6 col-lg-6',
                        hidden:                false,
                        name:                  item.nodeName,
                        mainComponentName:     'TerraButtonGroupComponent',
                        parameter:             {
                            nodes: item.children
                        }
                    });
            }
            else
            {
                while(this.terraNavigatorSplitViewConfig.modules.length > item.rootPath.length)
                {
                    this.terraNavigatorSplitViewConfig.modules.pop();
                }

                this.outputEndpointClicked.emit(item);
            }
        });

        this.inputNavigatorService.observableNewNodeByRootPath.subscribe((item:TerraNavigatorNodeInterface<D>) =>
        {
            this.addNodeAt(this.inputNodes, item.rootPath, -1, item);

            this.initRootPaths(this.inputNodes, null);
            this.refreshNodeVisibilities(this.inputNodes);

            this.addSearchNode(item);
        });

        this.inputNavigatorService.observableNewNodesByRoute.subscribe((items:Array<TerraNavigatorNodeInterface<D>>) =>
        {
            this.addNodesRecursive(items);
            this.refreshNodeVisibilities(this.inputNodes);

            items.forEach((item:TerraNavigatorNodeInterface<D>):void =>
            {
                this.addSearchNode(item);
            });
        });

        this.updateSearchNodes();

        this.isInit = true;
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(this.isInit === true && changes['inputNodes'])
        {
            this.terraNavigatorSplitViewConfig.modules = [];

            this.initRootPaths(changes['inputNodes'].currentValue, null);
            this.refreshNodeVisibilities(changes['inputNodes'].currentValue);

            this.updateSearchNodes();

            this.terraNavigatorSplitViewConfig.addModule({
                module:                TerraButtonGroupModule.forRoot(),
                instanceKey:           0,
                defaultWidth:          this.inputModuleWidth,
                hidden:                false,
                name:                  this.inputFirstBreadcrumbName,
                mainComponentName:     'TerraButtonGroupComponent',
                parameter:             {
                    nodes: changes['inputNodes'].currentValue
                }
            });
        }
    }

    private initRootPaths(data:Array<TerraNavigatorNodeInterface<D>>, rootIndex:Array<number>):Array<TerraNavigatorNodeInterface<D>>
    {
        for(let i:number = 0; i < data.length; i++)
        {
            data[i].rootPath = [];

            if(!isNullOrUndefined(rootIndex))
            {
                rootIndex.forEach((item:number):void =>
                {
                    data[i].rootPath.push(item);
                });
            }

            data[i].rootPath.push(i);

            if(!isNullOrUndefined(data[i].children) && data[i].children.length > 0)
            {
                this.initRootPaths(data[i].children, data[i].rootPath);
            }
        }

        return data;
    }

    private addNodesRecursive(nodes:Array<TerraNavigatorNodeInterface<D>>):void
    {
        nodes.forEach((item:TerraNavigatorNodeInterface<D>) =>
        {
            let routeArray:Array<string> = item.route.split('/');
            let routeIndex:number = -1;
            let result:Array<number> = [];

            this.findRootPath(routeArray, routeIndex, this.inputNodes, result);

            let newNode:TerraNavigatorNodeInterface<D> = {
                nodeName:  item.nodeName,
                nodeIcon:  item.nodeIcon,
                route:     routeArray[routeArray.length - 1],
                value:     item.value,
                rootPath:  [],
                children:  null,
                isVisible: item.isVisible,
                isActive:  item.isActive
            };

            this.addNodeAt(this.inputNodes, result, -1, newNode);

            this.initRootPaths(this.inputNodes, null);

            if(!isNullOrUndefined(item.children))
            {
                this.addNodesRecursive(item.children);
            }
        });
    }

    private findRootPath(routeArray:Array<string>, routeIndex:number, data:Array<TerraNavigatorNodeInterface<D>>, result:Array<number>):void
    {
        routeIndex++;

        data.forEach((item:TerraNavigatorNodeInterface<D>):void =>
        {
            if(item.route === routeArray[routeIndex])
            {
                result.push(item.rootPath[item.rootPath.length - 1]);

                if(!isNull(item.children))
                {
                    this.findRootPath(routeArray, routeIndex, item.children, result);
                }
            }
        });
    }

    private addNodeAt(data:Array<TerraNavigatorNodeInterface<D>>, rootIndex:Array<number>, position:number,
                      newNode:TerraNavigatorNodeInterface<D>):void
    {
        position++;

        if(position === rootIndex.length)
        {
            let newRootPath:Array<number> = newNode.rootPath;

            newRootPath.push(data.length);

            data.push({
                nodeName:  newNode.nodeName,
                nodeIcon:  newNode.nodeIcon,
                route:     newNode.route,
                value:     newNode.value,
                rootPath:  newRootPath,
                children:  newNode.children,
                isVisible: newNode.isVisible,
                isActive:  newNode.isActive
            });
        }
        else if(!isNullOrUndefined(data[rootIndex[position]].children))
        {
            this.addNodeAt(data[rootIndex[position]].children, rootIndex, position, newNode);
        }
        else
        {
            data[rootIndex[position]].children = [];
            this.addNodeAt(data[rootIndex[position]].children, rootIndex, position, newNode);
        }
    }

    private refreshNodeVisibilities(nodes:Array<TerraNavigatorNodeInterface<D>>):void
    {
        // go through the node list
        nodes.forEach((node:TerraNavigatorNodeInterface<D>):void =>
            {
                // check if there are children or if node is a leaf
                if(!isNullOrUndefined(node.children) && node.children.length > 0)
                {
                    // check descendants visibility
                    if(this.getTotalVisibleChildren(node) > 0)
                    {
                        this.refreshNodeVisibilities(node.children);
                    }
                    // there are no visible descendants -> hide node
                    else
                    {
                        node.isVisible = false;
                    }
                }
            }
        );
    }

    private getTotalVisibleChildren(rootNode:TerraNavigatorNodeInterface<D>):number
    {
        // initialize counter
        let childrenCount:number = 0;

        // go deep into the children
        if(!isNullOrUndefined(rootNode.children))
        {
            rootNode.children.forEach((node:TerraNavigatorNodeInterface<D>):void =>
                {
                    if(node.isVisible || isUndefined(node.isVisible))
                    {
                        childrenCount++;
                    }

                    // recursive
                    childrenCount += this.getTotalVisibleChildren(node);
                }
            );
        }

        // return count of children
        return childrenCount;
    }

    private updateSearchNodes():void
    {
        // reset node list
        this._searchNodeList = [];

        // convert tree model into flat hierarchy
        this.inputNodes.forEach((node:TerraNavigatorNodeInterface<D>) =>
        {
            this.addSearchNode(node);
        });
    }

    private addSearchNode(node:TerraNavigatorNodeInterface<D>):void
    {
        // check for null pointer
        if(isNullOrUndefined(node))
        {
            return;
        }

        // seek trough its children, if existing
        if(!isNullOrUndefined(node.children) && node.children.length > 0)
        {
            node.children.forEach((child:TerraNavigatorNodeInterface<D>) =>
            {
                this.addSearchNode(child);
            });
        }
        // only add nodes without children <=> leaves
        else
        {
            // check if node is visible
            if(isNullOrUndefined(node.isVisible) || node.isVisible) // TODO: rename in hidden!
            {
                // add node to the flat list
                this._searchNodeList.push(
                    {
                        value:   node,
                        caption: this.getNodePath(node)
                    }
                );
            }
        }
    }

    private openSelectedNode(suggest:TerraSuggestionBoxValueInterface):void
    {
        this.inputRouter.navigateByUrl(this.inputBaseRoute + this.getNodeRoute(suggest.value as TerraNavigatorNodeInterface<D>));
    }

    private getNodeRoute(node:TerraNavigatorNodeInterface<D>):string
    {
        let route:string = '';
        let nodes:Array<TerraNavigatorNodeInterface<D>> = this.inputNodes;

        if(!isNullOrUndefined(node.rootPath))
        {
            node.rootPath.forEach((root:number):void =>
            {
                route = route + '/' + nodes[root].route;
                nodes = nodes[root].children;
            });
        }

        return route;
    }

    private getNodePath(node:TerraNavigatorNodeInterface<D>):string
    {
        let route:string = '';
        let nodes:Array<TerraNavigatorNodeInterface<D>> = this.inputNodes;

        if(!isNullOrUndefined(node.rootPath))
        {
            node.rootPath.forEach((root:number):void =>
            {
                let translatedNodeName:string = this.translation.translate(nodes[root].nodeName);
                if(route === '')
                {
                    route = translatedNodeName;
                }
                else
                {
                    route += ' » ' + translatedNodeName;
                }
                nodes = nodes[root].children;
            });
        }

        return route;
    }

    public get searchNodeList():Array<TerraSuggestionBoxValueInterface>
    {
        return this._searchNodeList;
    }
}
