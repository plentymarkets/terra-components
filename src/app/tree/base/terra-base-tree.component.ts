import {
    Input,
    OnInit
} from '@angular/core';
import { TerraLeafInterface } from "../leaf/terra-leaf.interface";

/**
 * @author mkunze
 */
export class TerraBaseTreeComponent implements OnInit
{
    /**
     * current level leaf list
     */
    @Input() inputLeafList:Array<TerraLeafInterface>;
    
    /**
     * leafs one level higher than current leaf
     */
    @Input() inputParentLeafList:Array<TerraLeafInterface>;
    
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
    
    private onLeafClick(clickedLeaf:TerraLeafInterface):void
    {
        this.toggleOpen(clickedLeaf);
        this.setLeafActive(clickedLeaf)
    }
    
    private setLeafActive(clickedLeaf:TerraLeafInterface):void
    {
        this.setLeafListActive(clickedLeaf, this.inputLeafList);
    }
    
    private setLeafListActive(clickedLeaf:TerraLeafInterface,
                              inputLeafList:Array<TerraLeafInterface>):void
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
    
    private setLeafListInactive(inputLeafList:Array<TerraLeafInterface>):void
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
    
    private toggleOpen(clickedLeaf:TerraLeafInterface):void
    {
        clickedLeaf.isOpen = !clickedLeaf.isOpen;
    }
    
    private recursiveSearchActiveLeaf(leafListToSearch:Array<TerraLeafInterface>):TerraLeafInterface
    {
        let foundLeaf:TerraLeafInterface;
        
        for(let leaf of leafListToSearch)
        {
            if(leaf.isActive)
            {
                foundLeaf = leaf;
                
                return foundLeaf
            }
            else if (leaf.subLeafList)
            {
                foundLeaf = this.recursiveSearchActiveLeaf(leaf.subLeafList);
                
                if(foundLeaf != null)
                {
                    break;
                }
            }
        }
        
        return foundLeaf;
    }
    
    public getSelectedLeaf():TerraLeafInterface
    {
        return this.recursiveSearchActiveLeaf(this.inputLeafList);
    }
}
