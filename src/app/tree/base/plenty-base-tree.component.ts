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
    @Input() inputLeafList:Array<PlentyLeaf>;
    
    /**
     * leafs one level higher than current leaf
     */
    @Input() inputParentLeafList:Array<PlentyLeaf>;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
        if(this.inputParentLeafList)
        {
            for(let parentLeaf of this.inputParentLeafList)
            {
                if(parentLeaf.subLeafList)
                {
                    for(let subLeaf of parentLeaf.subLeafList)
                    {
                        for(let leaf of this.inputLeafList)
                        {
                            if(leaf == subLeaf)
                            {
                                leaf.parentLeafList = this.inputParentLeafList;
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
        this.setLeafListActive(clickedLeaf, this.inputLeafList);
    }
    
    private setLeafListActive(clickedLeaf:PlentyLeaf,
                              inputLeafList:Array<PlentyLeaf>):void
    {
        for(let leaf of inputLeafList)
        {
            if(leaf == clickedLeaf)
            {
                leaf.isActive = true;
                
                //set leafs inactive at one level higher
                if(this.inputParentLeafList)
                {
                    this.setLeafListInactive(this.inputParentLeafList);
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
    
    private setLeafListInactive(inputLeafList:Array<PlentyLeaf>):void
    {
        for(let leaf of inputLeafList)
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
