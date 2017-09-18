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
import { isNullOrUndefined } from 'util';

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
    @Input() inputFirstBreadcrumbName:string;

    @Output() outputEndpointClicked:EventEmitter<TerraNavigatorNodeInterface<D>>;
    @Output() outputNodeClicked:EventEmitter<TerraNavigatorNodeInterface<D>>;

    private _isInit:boolean;
    private _updateViewport:boolean;

    constructor(private _terraNavigatorSplitViewConfig:TerraNavigatorSplitViewConfig<D>)
    {
        this._isInit = false;
        this.outputEndpointClicked = new EventEmitter();
        this.outputNodeClicked = new EventEmitter();
        this._updateViewport = true;
    }

    ngOnInit()
    {
        if(isNullOrUndefined(this.inputModuleWidth))
        {
            this.inputModuleWidth = 'col-xs-12 col-md-12 col-lg-12';
        }

        if(!isNullOrUndefined(this.inputNodes))
        {
            this.initRootPaths(this.inputNodes, null);
            this.refreshNodeVisibilities(this.inputNodes);

            if(this.inputFirstBreadcrumbName === null || this.inputFirstBreadcrumbName === '')
            {
                console.error('You have to define an initial breadcrumb!!!');
            }

            if(this.inputNodes.length)
            {
                this._terraNavigatorSplitViewConfig
                    .addModule({
                                   module:            TerraButtonGroupModule.forRoot(),
                                   instanceKey:       0,
                                   defaultWidth:      this.inputModuleWidth,
                                   hidden:            false,
                                   name:              this.inputFirstBreadcrumbName,
                                   mainComponentName: 'TerraButtonGroupComponent',
                                   parameter:         {
                                       nodes: this.inputNodes
                                   }
                               });
            }
        }

        this._terraNavigatorSplitViewConfig.observableNodeClicked
            .subscribe((item:TerraNavigatorNodeInterface<D>) =>
                       {
                           if(isNullOrUndefined(item.rootPath))
                           {
                               this.initRootPaths(this.inputNodes, null);
                           }

                           this.outputNodeClicked.emit(item);

                           if(!isNullOrUndefined(item.children))
                           {
                               this._terraNavigatorSplitViewConfig.modules[0].defaultWidth = 'col-xs-6 col-md-6 col-lg-6';

                               this._terraNavigatorSplitViewConfig
                                   .addModule({
                                                  module:            TerraButtonGroupModule.forRoot(),
                                                  instanceKey:       item.rootPath.length,
                                                  defaultWidth:      'col-xs-6 col-md-6 col-lg-6',
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

        this.inputNavigatorService.observableNewNodeByRootPath
            .subscribe((item:TerraNavigatorNodeInterface<D>) =>
                       {
                           this.addNodeAt(this.inputNodes, item.rootPath, -1, item);

                           this.initRootPaths(this.inputNodes, null);
                           this.refreshNodeVisibilities(this.inputNodes);
                       });

        this.inputNavigatorService.observableNewNodesByRoute
            .subscribe((item:Array<TerraNavigatorNodeInterface<D>>) =>
                       {
                           this.addNodesRecursive(item);
                           this.refreshNodeVisibilities(this.inputNodes);
                       });

        this.inputNavigatorService.observableRefresh
            .subscribe(() =>
                       {
                           this.initRootPaths(this.inputNodes, null);
                           this.refreshNodeVisibilities(this.inputNodes);

                           this._terraNavigatorSplitViewConfig
                               .addModule({
                                              module:            TerraButtonGroupModule.forRoot(),
                                              instanceKey:       0,
                                              defaultWidth:      this.inputModuleWidth,
                                              hidden:            false,
                                              name:              this.inputFirstBreadcrumbName,
                                              mainComponentName: 'TerraButtonGroupComponent',
                                              parameter:         {
                                                  nodes: this.inputNodes
                                              }
                                          });

                           //this.initRootPaths(item, null);
                           //this.refreshNodeVisibilities(item);
                       });

        this._isInit = true;
    }

    ngOnChanges(changes:SimpleChanges)
    {
        if(this._isInit === true && changes['inputNodes'])
        {
            this._terraNavigatorSplitViewConfig.modules = [];

            this.initRootPaths(changes['inputNodes'].currentValue, null);
            this.refreshNodeVisibilities(changes['inputNodes'].currentValue);

            this._terraNavigatorSplitViewConfig
                .addModule({
                               module:            TerraButtonGroupModule.forRoot(),
                               instanceKey:       0,
                               defaultWidth:      this.inputModuleWidth,
                               hidden:            false,
                               name:              this.inputFirstBreadcrumbName,
                               mainComponentName: 'TerraButtonGroupComponent',
                               parameter:         {
                                   nodes: changes['inputNodes'].currentValue
                               }
                           });
        }
    }

    private initRootPaths(data:Array<TerraNavigatorNodeInterface<D>>, rootIndex:Array<number>):Array<TerraNavigatorNodeInterface<D>>
    {
        for(let i = 0; i < data.length; i++)
        {
            data[i].rootPath = [];

            if(!isNullOrUndefined(rootIndex))
            {
                rootIndex.forEach((item) =>
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

    private addNodesRecursive(nodes:Array<TerraNavigatorNodeInterface<D>>)
    {
        nodes.forEach((item:TerraNavigatorNodeInterface<D>) =>
                      {
                          let routeArray:Array<string> = item.route.split('/');
                          let routeIndex:number = -1;
                          let result = [];

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

    private findRootPath(routeArray:Array<string>, routeIndex:number, data:Array<TerraNavigatorNodeInterface<D>>, result:Array<number>)
    {
        routeIndex++;

        data.forEach((item) =>
                     {
                         if(item.route === routeArray[routeIndex])
                         {
                             result.push(item.rootPath[item.rootPath.length - 1]);

                             if(item.children != null)
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

        if(!isNullOrUndefined(rootIndex) && position === rootIndex.length)
        {
            let newRootPath = newNode.rootPath;

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
        else if(!isNullOrUndefined(rootIndex) && !isNullOrUndefined(data[rootIndex[position]].children))
        {
            this.addNodeAt(data[rootIndex[position]].children, rootIndex, position, newNode);
        }
        else if(!isNullOrUndefined(rootIndex))
        {
            data[rootIndex[position]].children = [];
            this.addNodeAt(data[rootIndex[position]].children, rootIndex, position, newNode);
        }
    }

    private refreshNodeVisibilities(nodes:Array<TerraNavigatorNodeInterface<D>>)
    {
        // go through the node list
        nodes.forEach((node) =>
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
        )
    }

    private getTotalVisibleChildren(rootNode:TerraNavigatorNodeInterface<D>):number
    {
        // initialize counter
        let childrenCount = 0;

        // go deep into the children
        if(!isNullOrUndefined(rootNode.children))
        {
            rootNode.children
                    .forEach((node) =>
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
