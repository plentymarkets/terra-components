import {
    Input,
    OnInit
} from '@angular/core';
import { TerraLeafInterface } from '../leaf/terra-leaf.interface';
import {
    isNull,
    isNullOrUndefined
} from 'util';

/**
 * @author mkunze
 */
export class TerraBaseTreeComponent implements OnInit
{
    /**
     * current level leaf list
     */
    @Input()
    public inputLeafList:Array<TerraLeafInterface>;

    /**
     * leafs one level higher than current leaf
     */
    @Input()
    public inputParentLeafList:Array<TerraLeafInterface>;

    /**
     * complete leaf list for better and faster searching
     */
    @Input()
    public inputCompleteLeafList:Array<TerraLeafInterface>;

    public ngOnInit():void
    {
        if(!this.inputCompleteLeafList)
        {
            this.inputCompleteLeafList = this.inputLeafList;
        }

        if(this.inputParentLeafList)
        {
            this.iterateOverParents(this.inputParentLeafList);
        }
    }

    private iterateOverParents(parents:Array<TerraLeafInterface>):void
    {
        for(let parentLeaf of parents)
        {
            if(parentLeaf.subLeafList)
            {
                this.iterateOverSiblings(parentLeaf.subLeafList);
            }
        }
    }

    private iterateOverSiblings(siblings:Array<TerraLeafInterface>):void
    {
        for(let subLeaf of siblings)
        {
            this.iterateOverChildren(subLeaf);
        }
    }

    private iterateOverChildren(parentOfChild:TerraLeafInterface):void
    {
        for(let leaf of this.inputLeafList)
        {
            if(leaf === parentOfChild)
            {
                leaf.parentLeafList = this.inputParentLeafList;
            }
        }
    }

    protected onLeafClick(clickedLeaf:TerraLeafInterface):void
    {
        if(!isNullOrUndefined(clickedLeaf.subLeafList) && !clickedLeaf.avoidOpenOnClick)
        {
            this.toggleOpen(clickedLeaf);
        }

        if(!isNullOrUndefined(clickedLeaf.clickFunction) && !clickedLeaf.isActive)
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

    private recursiveSearchActiveLeaf(leafListToSearch:Array<TerraLeafInterface>):TerraLeafInterface
    {
        let foundLeaf:TerraLeafInterface;

        for(let leaf of leafListToSearch)
        {
            if(leaf.isActive)
            {
                foundLeaf = leaf;

                return foundLeaf;
            }
            else if(leaf.subLeafList)
            {
                foundLeaf = this.recursiveSearchActiveLeaf(leaf.subLeafList);

                if(!isNullOrUndefined(foundLeaf))
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
