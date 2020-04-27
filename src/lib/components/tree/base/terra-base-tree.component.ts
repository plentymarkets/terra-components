import { Input, OnInit } from '@angular/core';
import { TerraLeafInterface } from '../leaf/terra-leaf.interface';
import { isNullOrUndefined } from 'util';

/**
 * @author mkunze
 */
export class TerraBaseTreeComponent implements OnInit {
  /**
   * current level leaf list
   */
  @Input()
  public inputLeafList: Array<TerraLeafInterface>;

  /**
   * leafs one level higher than current leaf
   */
  @Input()
  public inputParentLeafList: Array<TerraLeafInterface>;

  /**
   * complete leaf list for better and faster searching
   */
  @Input()
  public inputCompleteLeafList: Array<TerraLeafInterface>;

  public ngOnInit(): void {
    if (!this.inputCompleteLeafList) {
      this.inputCompleteLeafList = this.inputLeafList;
    }

    if (this.inputParentLeafList) {
      this._iterateOverParents(this.inputParentLeafList);
    }
  }

  public getSelectedLeaf(): TerraLeafInterface {
    return this._recursiveSearchActiveLeaf(this.inputLeafList);
  }

  public _onLeafClick(clickedLeaf: TerraLeafInterface): void {
    if (!isNullOrUndefined(clickedLeaf.subLeafList) && !clickedLeaf.avoidOpenOnClick) {
      this._toggleOpen(clickedLeaf);
    }

    if (!isNullOrUndefined(clickedLeaf.clickFunction) && !clickedLeaf.isActive) {
      clickedLeaf.clickFunction();
    }

    if (!clickedLeaf.isActive) {
      this._recursiveLeafListInactive(this.inputCompleteLeafList);
      clickedLeaf.isActive = true;
    }
  }

  public _toggleOpen(clickedLeaf: TerraLeafInterface): void {
    clickedLeaf.isOpen = !clickedLeaf.isOpen;
  }

  private _iterateOverParents(parents: Array<TerraLeafInterface>): void {
    for (let parentLeaf of parents) {
      if (parentLeaf.subLeafList) {
        this._iterateOverSiblings(parentLeaf.subLeafList);
      }
    }
  }

  private _iterateOverSiblings(siblings: Array<TerraLeafInterface>): void {
    for (let subLeaf of siblings) {
      this._iterateOverChildren(subLeaf);
    }
  }

  private _iterateOverChildren(parentOfChild: TerraLeafInterface): void {
    for (let leaf of this.inputLeafList) {
      if (leaf === parentOfChild) {
        leaf.parentLeafList = this.inputParentLeafList;
      }
    }
  }

  private _recursiveLeafListInactive(list: Array<TerraLeafInterface>): boolean {
    let foundActive: boolean = false;

    for (let leaf of list) {
      if (leaf.isActive) {
        leaf.isActive = false;
        return true;
      } else if (leaf.subLeafList) {
        foundActive = this._recursiveLeafListInactive(leaf.subLeafList);
      }

      if (foundActive) {
        return foundActive;
      }
    }

    return false;
  }

  private _recursiveSearchActiveLeaf(
    leafListToSearch: Array<TerraLeafInterface>
  ): TerraLeafInterface {
    let foundLeaf: TerraLeafInterface;

    for (let leaf of leafListToSearch) {
      if (leaf.isActive) {
        foundLeaf = leaf;

        return foundLeaf;
      } else if (leaf.subLeafList) {
        foundLeaf = this._recursiveSearchActiveLeaf(leaf.subLeafList);

        if (!isNullOrUndefined(foundLeaf)) {
          break;
        }
      }
    }

    return foundLeaf;
  }
}
