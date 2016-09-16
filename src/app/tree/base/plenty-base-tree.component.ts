import {
  Input,
  OnInit
} from '@angular/core';
import { PlentyLeaf } from "../leaf/plenty-leaf.component";

/**
 * @author mkunze
 */
export class PlentyBaseTree implements OnInit
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
  }

  ngOnInit()
  {
    if(this.parentLeafList)
    {
      for(let parentLeaf of this.parentLeafList)
      {
        if(parentLeaf.subLeafList)
        {
          for(let subLeaf of parentLeaf.subLeafList)
          {
            for(let leaf of this.leafList)
            {
              if(leaf == subLeaf)
              {
                leaf.parentLeafList = this.parentLeafList;
              }
            }
          }
        }
      }
    }
  }

  private onLeafClick(clickedLeaf:PlentyLeaf):void
  {
    this.toggleOpen(clickedLeaf);
    this.setLeafActive(clickedLeaf)
  }

  private setLeafActive(clickedLeaf:PlentyLeaf):void
  {
    this.setLeafListActive(clickedLeaf, this.leafList);
  }

  private setLeafListActive(clickedLeaf:PlentyLeaf,
                            leafList:Array<PlentyLeaf>):void
  {
    for(let leaf of leafList)
    {
      if(leaf == clickedLeaf)
      {
        leaf.isActive = true;

        //set leafs inactive at one level higher
        if(this.parentLeafList)
        {
          this.setLeafListInactive(this.parentLeafList);
        }
      }
      else
      {
        leaf.isActive = false;
      }

      //handle subLeafs recursively
      if(leaf.subLeafList && leaf.subLeafList.length > 0)
      {
        this.setLeafListActive(leaf, leaf.subLeafList);
      }
    }
  }

  private setLeafListInactive(leafList:Array<PlentyLeaf>):void
  {
    for(let leaf of leafList)
    {
      leaf.isActive = false;

      if(leaf.parentLeafList)
      {
        this.setLeafListInactive(leaf.parentLeafList);
      }
    }
  }

  private toggleOpen(clickedLeaf:PlentyLeaf):void
  {
    clickedLeaf.isOpen = !clickedLeaf.isOpen;
  }
}
