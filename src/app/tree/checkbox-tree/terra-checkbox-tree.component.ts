import {
    Component,
    Input
} from '@angular/core';
import { TerraBaseTreeComponent } from '../base/terra-base-tree.component';
import { TerraLeafInterface } from '../leaf/terra-leaf.interface';

@Component({
               selector: 'terra-checkbox-tree',
               styles:   [require('./terra-checkbox-tree.component.scss')],
               template: require('./terra-checkbox-tree.component.html')
           })
/**
 * TODO FUNKTIONIERT NOCH NICHT
 */
export class TerraCheckboxTreeComponent extends TerraBaseTreeComponent
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
        super();
    }

    selectedLeafList:Array<TerraLeafInterface> = [];

    onCheckboxValueChange(event,
                          leaf:TerraLeafInterface)
    {
        leaf.checkboxChecked = event.currentTarget.checked;

        // this.recursiveAddLeafToList(leaf);

        this.recursiveCheckboxCheck(leaf);

        // alert(this.selectedLeafList.length);
    }

    recursiveAddLeafToList(leaf:TerraLeafInterface)
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

    recursiveCheckboxCheck(leaf:TerraLeafInterface)
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
