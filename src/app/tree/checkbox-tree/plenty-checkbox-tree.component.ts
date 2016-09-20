import {
    Component,
    Input
} from '@angular/core';
import { PlentyBaseTree } from '../base/plenty-base-tree.component';
import { PlentyLeaf } from '../leaf/plenty-leaf.component';

@Component({
               selector: 'plenty-checkbox-tree',
               // templateUrl: 'plenty-checkbox-tree.component.html'
               styles:   [``],
               template: `<ul>
                              <template ngFor let-leaf [ngForOf]="leafList">
                                <li class="node leaf" [ngClass]="{'collapsed': !leaf.isOpen, 'active': leaf.isActive}">
                                  <div class="leaf-titel" (click)="setLeafActive(leaf)">
                                    <label class="input-control checkbox small-check">
                                      <input type="checkbox" (change)="onCheckboxValueChange($event, leaf)" (checked)="leaf.checkboxChecked">
                                      <span class="check"></span>
                                    </label>
                                    <span>
                                      {{leaf.caption}}
                                    </span>
                                  </div>
                                  <span class="node-toggle" *ngIf="leaf.subLeafList" (click)="toggleOpen(leaf)"></span>
                                  <plenty-checkbox-tree [leafList]="leaf.subLeafList" [parentLeafList]="leafList" *ngIf="leaf.subLeafList"></plenty-checkbox-tree>
                                </li>
                              </template>
                            </ul>`
           })
/**
 * TODO FUNKTIONIERT NOCH NICHT
 */
export class PlentyCheckboxTree extends PlentyBaseTree
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

    selectedLeafList:Array<PlentyLeaf> = [];

    onCheckboxValueChange(event,
                          leaf:PlentyLeaf)
    {
        leaf.checkboxChecked = event.currentTarget.checked;

        // this.recursiveAddLeafToList(leaf);

        this.recursiveCheckboxCheck(leaf);

        // alert(this.selectedLeafList.length);
    }

    recursiveAddLeafToList(leaf:PlentyLeaf)
    {
        if(leaf.checkboxChecked)
        {
            this.selectedLeafList.push(leaf);
        }
        else
        {
            let leafIndex = this.selectedLeafList.indexOf(leaf);

            this.selectedLeafList.splice(leafIndex, 1);
        }

        if(leaf.subLeafList)
        {
            for(let subLeaf of leaf.subLeafList)
            {
                this.recursiveAddLeafToList(subLeaf);
            }
        }
    }

    recursiveCheckboxCheck(leaf:PlentyLeaf)
    {
        if(leaf.subLeafList)
        {
            for(let subLeaf of leaf.subLeafList)
            {
                subLeaf.checkboxChecked = leaf.checkboxChecked;

                if(subLeaf.subLeafList)
                {
                    this.recursiveCheckboxCheck(subLeaf);
                }
            }
        }
    }
}
