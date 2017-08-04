import {
    Input,
    OnInit
} from '@angular/core';
import { TerraLeafInterface } from '../leaf/terra-leaf.interface';

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

    /**
     * complete leaf list for better and faster searching
     */
    @Input() inputCompleteLeafList:Array<TerraLeafInterface>;

    constructor()
    {
    }

    ngOnInit():void
    {

        if(!this.inputCompleteLeafList)
        {
            this.inputCompleteLeafList = this.inputLeafList;
        }

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
        if(clickedLeaf.subLeafList != null && !clickedLeaf.avoidOpenOnClick)
        {
            this.toggleOpen(clickedLeaf);
        }

        if(clickedLeaf.clickFunction != null && !clickedLeaf.isActive)
        {
            clickedLeaf.clickFunction();
        }

        if(!clickedLeaf.isActive)
        {
            this.recursiveLeafListInactive(this.inputCompleteLeafList);
            clickedLeaf.isActive = true;
        }
    }

    private recursiveLeafListInactive(list:Array<TerraLeafInterface>):boolean
    {
        let foundActive:boolean = false;

        for(let leaf of list)
        {
            if(leaf.isActive)
            {
                leaf.isActive = false;
                return true;
            }
            else if(leaf.subLeafList)
            {
                foundActive = this.recursiveLeafListInactive(leaf.subLeafList);
            }

            if(foundActive)
            {
                return foundActive;
            }
        }

        return false;
    }

    private toggleOpen(clickedLeaf:TerraLeafInterface):void
    {
        clickedLeaf.isOpen = !clickedLeaf.isOpen;
    }

    private onArrowClick(clickedLeaf:TerraLeafInterface):void
    {
        if(clickedLeaf.onOpenFunction != null && !clickedLeaf.isOnOpenFunctionCalled)
        {
            clickedLeaf.onOpenFunction();
            clickedLeaf.isOnOpenFunctionCalled = true;
        }

        this.toggleOpen(clickedLeaf);
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
            else if(leaf.subLeafList)
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

    private checkIfArrowNeeded(clickedLeaf:TerraLeafInterface):boolean
    {
        return clickedLeaf.subLeafList != null || clickedLeaf.onOpenFunction != null;
    }
}
