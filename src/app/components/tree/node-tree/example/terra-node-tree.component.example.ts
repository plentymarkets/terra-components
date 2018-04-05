import {
    Component,
    OnInit
} from '@angular/core';
import { TerraNodeInterface } from '../data/terra-node.interface';
import { TerraNodeTreeConfig } from '../data/terra-node-tree.config';

export interface ExampleTreeData
{
    id:number;
}

@Component({
    selector:  'terra-node-tree-example',
    template:  require('./terra-node-tree.component.example.html'),
    styles:    [require('./terra-node-tree.component.example.scss')],
    providers: [TerraNodeTreeConfig]
})
export class TerraNodeTreeComponentExample implements OnInit
{
    private nodeCounter:number = 0;


    constructor(private _nodeTreeConfig:TerraNodeTreeConfig<ExampleTreeData>)
    {
    }

    public ngOnInit():void
    {
        this.createCompleteTree();
    }

    protected addNode():void
    {
        this._nodeTreeConfig.addNode({
            name:      'Test' + this.nodeCounter,
            id:        this.nodeCounter,
            isVisible: true
        });

        this.nodeCounter++;
    }

    protected addExistingNode():void
    {
        this._nodeTreeConfig.addNode({
            name: 'Test' + this.nodeCounter,
            id:   0
        });
    }

    protected findNodeById(id:string | number):void
    {
        let node:TerraNodeInterface<ExampleTreeData> = this._nodeTreeConfig.findNodeById(id);
        alert(node.name);

    }

    protected deleteNodeById(id:string | number):void
    {
        this._nodeTreeConfig.removeNodeById(id);
    }

    protected getSelectedNode():void
    {
        console.log(this._nodeTreeConfig.currentSelectedNode);
    }

    protected deleteSelectedNode():void
    {
        this._nodeTreeConfig.removeNode(this._nodeTreeConfig.currentSelectedNode);
    }

    protected updateSelectedNode():void
    {
        this._nodeTreeConfig.currentSelectedNode.name = 'Terra';
    }

    protected updateNodeById(id:string | number):void
    {
        this._nodeTreeConfig.updateNodeById(id,
            {
                id:   id,
                name: 'Terra'
            });
    }

    protected addChildToNodeById(id:string | number):void
    {
        this._nodeTreeConfig.addChildToNodeById(id, {
            id:        133,
            name:      'myNewNode',
            isVisible: true
        });
    }

    protected setSelectedNode(id:string | number):void
    {
        this._nodeTreeConfig.setCurrentSelectedNodeById(id);
    }

    protected createCompleteTree():void
    {
        this._nodeTreeConfig.list = [
            {
                id:        11,
                name:      'Test1',
                isVisible: true,
                children:  [
                    {
                        id:        12,
                        name:      'Child1',
                        isVisible: true,
                        children:  [{
                            id:        13,
                            name:      'Subchild1',
                            isVisible: true,
                            onClick:   ():void =>
                                       {
                                           alert('Hello i am a click function');
                                       }
                        }]
                    }
                ]
            },
            {
                id:        14,
                name:      'Test2',
                isVisible: true,
            },
            {
                id:        15,
                name:      'Test3',
                isVisible: true,
            }];
    }

    protected createTreeWithIcons():void
    {
        this._nodeTreeConfig.list = [
            {
                id:        1,
                name:      'Ebay',
                icon:      'icon-ebay',
                isVisible: true,
                children:  [{
                    id:        2,
                    name:      'Child1',
                    isVisible: true,
                    children:  [{
                        id:        3,
                        name:      'Subchild1',
                        isVisible: true,
                        onClick:   ():void =>
                                   {
                                       alert('Hello i am a click function');
                                   }
                    }]
                }]
            },
            {
                id:        4,
                name:      'Ceres',
                isVisible: true,
                icon:      'icon-backend_ceres'
            },
            {
                id:        5,
                name:      'Amazon Prime',
                isVisible: true,
                icon:      'icon-ship_amaz_prime'

            }];
    }
}
