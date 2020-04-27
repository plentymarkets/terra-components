import { Component, OnInit } from '@angular/core';
import { TerraNodeInterface } from '../data/terra-node.interface';
import { TerraNodeTreeConfig } from '../data/terra-node-tree.config';

export interface ExampleTreeData {
  id: number;
}

@Component({
  selector: 'terra-node-tree-example',
  templateUrl: './terra-node-tree.component.example.html',
  styleUrls: ['./terra-node-tree.component.example.scss'],
  providers: [TerraNodeTreeConfig]
})
export class TerraNodeTreeComponentExample implements OnInit {
  private _nodeCounter: number = 0;

  constructor(public _nodeTreeConfig: TerraNodeTreeConfig<ExampleTreeData>) {}

  public ngOnInit(): void {
    this.createCompleteTree();
  }

  public _addNode(): void {
    this._nodeTreeConfig.addNode({
      name: 'Test' + this._nodeCounter,
      id: this._nodeCounter,
      isVisible: true
    });

    this._nodeCounter++;
  }

  public _addExistingNode(): void {
    this._nodeTreeConfig.addNode({
      name: 'Test' + this._nodeCounter,
      id: 0
    });
  }

  public _findNodeById(id: string | number): void {
    let node: TerraNodeInterface<ExampleTreeData> = this._nodeTreeConfig.findNodeById(id);
    alert(node.name);
  }

  public _deleteNodeById(id: string | number): void {
    this._nodeTreeConfig.removeNodeById(id);
  }

  public _getSelectedNode(): void {
    console.log(this._nodeTreeConfig.currentSelectedNode);
  }

  public _deleteSelectedNode(): void {
    this._nodeTreeConfig.removeNode(this._nodeTreeConfig.currentSelectedNode);
  }

  public _updateSelectedNode(): void {
    this._nodeTreeConfig.currentSelectedNode.name = 'Terra';
  }

  public _updateNodeById(id: string | number): void {
    this._nodeTreeConfig.updateNodeById(id, {
      id: id,
      name: 'Terra'
    });
  }

  public _addChildToNodeById(id: string | number): void {
    this._nodeTreeConfig.addChildToNodeById(id, {
      id: 133,
      name: 'myNewNode',
      isVisible: true
    });
  }

  public setSelectedNode(id: string | number): void {
    this._nodeTreeConfig.setCurrentSelectedNodeById(id);
  }

  public createCompleteTree(): void {
    this._nodeTreeConfig.list = [
      {
        id: 11,
        name: 'Test1',
        isVisible: true,
        children: [
          {
            id: 12,
            name: 'Child1',
            isVisible: true,
            children: [
              {
                id: 13,
                name: 'Subchild1',
                isVisible: true,
                onClick: (): void => {
                  alert('Hello i am a click function');
                }
              }
            ]
          }
        ]
      },
      {
        id: 14,
        name: 'Test2',
        isVisible: true
      },
      {
        id: 15,
        name: 'Test3',
        isVisible: true
      }
    ];
  }

  public _createTreeWithIcons(): void {
    this._nodeTreeConfig.list = [
      {
        id: 1,
        name: 'Ebay',
        icon: 'icon-ebay',
        isVisible: true,
        children: [
          {
            id: 2,
            name: 'Child1',
            isVisible: true,
            children: [
              {
                id: 3,
                name: 'Subchild1',
                isVisible: true,
                onClick: (): void => {
                  alert('Hello i am a click function');
                }
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'Ceres',
        isVisible: true,
        icon: 'icon-backend_ceres'
      },
      {
        id: 5,
        name: 'Amazon Prime',
        isVisible: true,
        icon: 'icon-ship_amaz_prime'
      }
    ];
  }
}
