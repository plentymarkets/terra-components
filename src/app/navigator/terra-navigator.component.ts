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

/**
 * @author mscharf
 */
@Component({
               selector: 'terra-navigator',
               template: require('./terra-navigator.component.html'),
               styles:   [require('./terra-navigator.component.scss')]
           })
export class TerraNavigatorComponent<D> implements OnInit, OnChanges
{
    @Input() inputNodes:Array<TerraNavigatorNodeInterface<D>>;
    @Input() inputNavigatorService:TerraNavigatorConfig<D>;
    @Input() inputModuleWidth:string;

    @Output() outputEndpointClicked:EventEmitter<TerraNavigatorNodeInterface<D>>;

    private _isInit:boolean;

    constructor(private _terraNavigatorSplitViewConfig:TerraNavigatorSplitViewConfig<D>)
    {
        this._isInit = false;
        this.outputEndpointClicked = new EventEmitter();
    }

    ngOnInit()
    {
        if(this.inputModuleWidth === null || this.inputModuleWidth === undefined)
        {
            this.inputModuleWidth = 'col-xs-12 col-md-12 col-lg-12';
        }

        if(this.inputNodes !== null)
        {
            this.initRootPaths(this.inputNodes, null);
            this.refreshNodeVisibilities(this.inputNodes);

            this._terraNavigatorSplitViewConfig
                .addModule({
                               module:            TerraButtonGroupModule.forRoot(),
                               instanceKey:       0,
                               defaultWidth:      this.inputModuleWidth,
                               hidden:            false,
                               name:              'Menü',
                               mainComponentName: 'TerraButtonGroupComponent',
                               parameter:         {
                                   nodes: this.inputNodes
                               }
                           });
        }

        this._terraNavigatorSplitViewConfig
            .observableNodeClicked
            .subscribe((item:TerraNavigatorNodeInterface<D>) =>
                       {
                           if(item.children !== null)
                           {
                               this._terraNavigatorSplitViewConfig
                                   .addModule({
                                                  module:            TerraButtonGroupModule.forRoot(),
                                                  instanceKey:       item.rootPath.length,
                                                  defaultWidth:      this.inputModuleWidth,
                                                  hidden:            false,
                                                  name:              item.nodeName,
                                                  mainComponentName: 'TerraButtonGroupComponent',
                                                  parameter:         {
                                                      nodes: item.children
                                                  }
                                              });
                           }
                           else
                           {
                               while(this._terraNavigatorSplitViewConfig.modules.length > item.rootPath.length)
                               {
                                   this._terraNavigatorSplitViewConfig.modules.pop();
                               }

                               this.outputEndpointClicked.emit(item);
                           }
                       });

        this.inputNavigatorService
            .observableNewNodeByRootPath
            .subscribe((item:TerraNavigatorNodeInterface<D>) =>
                       {
                           this.addNodeAt(this.inputNodes, item.rootPath, -1, item);

                           this.initRootPaths(this.inputNodes, null);
                           this.refreshNodeVisibilities(this.inputNodes);
                       });

        this.inputNavigatorService
            .observableNewNodesByRoute
            .subscribe((item:Array<TerraNavigatorNodeInterface<D>>) =>
                       {
                           console.log(item);

                           this.addNodesRecursive(item);
                           this.refreshNodeVisibilities(this.inputNodes);
                       });

        this._isInit = true;
    }

    ngOnChanges(changes:SimpleChanges)
    {
        if(this._isInit == true && changes["inputNodes"])
        {
            this.initRootPaths(this.inputNodes, null);
            this.refreshNodeVisibilities(this.inputNodes);

            this._terraNavigatorSplitViewConfig
                .addModule({
                               module:            TerraButtonGroupModule.forRoot(),
                               instanceKey:       0,
                               defaultWidth:      this.inputModuleWidth,
                               hidden:            false,
                               name:              'Menü',
                               mainComponentName: 'TerraButtonGroupComponent',
                               parameter:         {
                                   nodes: this.inputNodes
                               }
                           });
        }
    }

    private initRootPaths(data:Array<TerraNavigatorNodeInterface<D>>, rootIndex:Array<number>):Array<TerraNavigatorNodeInterface<D>>
    {
        for(let i = 0; i < data.length; i++)
        {
            data[i].rootPath = [];

            if(rootIndex !== null)
            {
                rootIndex.forEach((item) =>
                                  {
                                      data[i].rootPath.push(item);
                                  });
            }

            data[i].rootPath.push(i);

            if(data[i].children !== null && data[i].children.length > 0)
            {
                this.initRootPaths(data[i].children, data[i].rootPath);
            }
        }

        return data;
    }

    private addNodesRecursive(nodes:Array<TerraNavigatorNodeInterface<D>>)
    {
        nodes.forEach((item:TerraNavigatorNodeInterface<D>) =>
                      {
                          let routeArray:Array<string> = item.route.split('/');
                          let routeIndex:number = -1;
                          let result = [];

                          this.findRooPath(routeArray,
                                           routeIndex,
                                           this.inputNodes,
                                           result
                          );

                          let newNode:TerraNavigatorNodeInterface<D> = {
                              nodeName: item.nodeName,
                              nodeIcon: item.nodeIcon,
                              route:    routeArray[routeArray.length - 1],
                              value:    item.value,
                              rootPath: [],
                              children: null
                          };

                          if(item.children !== null)
                          {
                              newNode.children = [];
                          }

                          this.addNodeAt(this.inputNodes, result, -1, newNode);

                          this.initRootPaths(this.inputNodes, null);

                          if(item.children !== null)
                          {
                              this.addNodesRecursive(item.children);
                          }
                      });
    }

    private findRooPath(routeArray:Array<string>, routeIndex:number,
                        data:Array<TerraNavigatorNodeInterface<D>>, result:Array<number>)
    {
        routeIndex++;

        data.forEach((item) =>
                     {
                         if(item.route == routeArray[routeIndex])
                         {
                             result.push(item.rootPath[item.rootPath.length - 1]);

                             if(item.children !== null)
                             {
                                 this.findRooPath(routeArray, routeIndex, item.children, result);
                             }
                         }
                     });
    }

    private addNodeAt(data:Array<TerraNavigatorNodeInterface<D>>, rootIndex:Array<number>, position:number,
                      newNode:TerraNavigatorNodeInterface<D>):void
    {
        position++;

        if(position == rootIndex.length)
        {
            let newRootPath = newNode.rootPath;

            newRootPath.push(data.length);

            data.push({
                          nodeName: newNode.nodeName,
                          nodeIcon: newNode.nodeIcon,
                          route:    newNode.route,
                          rootPath: newRootPath,
                          children: newNode.children
                      });
        }
        else
        {
            this.addNodeAt(data[rootIndex[position]].children, rootIndex, position, newNode);
        }
    }

    private refreshNodeVisibilities(nodes:Array<TerraNavigatorNodeInterface<D>>)
    {
        // go through the node list
        nodes.forEach(
            (node) =>
            {
                // check if there are children or if node is a leaf
                if(node.children !== null && node.children.length > 0)
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
        )
    }

    private getTotalVisibleChildren(rootNode:TerraNavigatorNodeInterface<D>):number
    {
        // initialize counter
        let childrenCount = 0;

        // go deep into the children
        if(rootNode.children !== null)
        {
            rootNode.children.forEach(
                (node) =>
                {
                    if(node.isVisible || node.isVisible === undefined)
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
}
