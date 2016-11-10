import {
    Component,
    Input
} from '@angular/core';
import { PlentyBaseTree } from '../base/plenty-base-tree.component';
import { PlentyLeaf } from '../leaf/plenty-leaf.component';

@Component({
               selector: 'terra-checkbox-tree',
               styles:   [require('./plenty-checkbox-tree.component.scss').toString()],
               template: require('./plenty-checkbox-tree.component.html')
           })
/**
 * TODO FUNKTIONIERT NOCH NICHT
 */
export class PlentyCheckboxTree extends PlentyBaseTree
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
