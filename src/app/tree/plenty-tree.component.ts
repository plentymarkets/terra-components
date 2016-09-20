import {
    Component,
    Input
} from '@angular/core';
import { PlentyBaseTree } from "./base/plenty-base-tree.component";
import { PlentyLeaf } from './leaf/plenty-leaf.component';

@Component({
               selector: 'plenty-tree',
               styles:   [``],
               template: `<ul>
                              <template ngFor let-leaf [ngForOf]="leafList">
                                <li class="node leaf" [ngClass]="{'collapsed': !leaf.isOpen, 'active': leaf.isActive}">
                                  <div class="leaf-titel" (click)="setLeafActive(leaf)">
                                    <span>
                                      <span class="icon" [ngClass]="leaf.icon"></span>
                                      {{leaf.caption}}
                                    </span>
                                  </div>
                                  <span class="node-toggle" *ngIf="leaf.subLeafList" (click)="toggleOpen(leaf)"></span>
                                  <plenty-tree [leafList]="leaf.subLeafList" [parentLeafList]="leafList" *ngIf="leaf.subLeafList"></plenty-tree>
                                </li>
                              </template>
                            </ul>`
               // templateUrl: 'plenty-tree.component.html',
               // styleUrls: ['tree.component.css']
           })
export class PlentyTree extends PlentyBaseTree
{

    /**
     * current level leaf list
     */
    @Input() leafList:Array<PlentyLeaf>;

    /**
     * leafs one level higher than current leaf
     */
    @Input() parentLeafList:Array<PlentyLeaf>;

    constructor()
    {
        super();
    }
}
