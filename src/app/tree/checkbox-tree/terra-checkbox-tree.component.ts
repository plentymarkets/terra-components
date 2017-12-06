import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraBaseTreeComponent } from '../base/terra-base-tree.component';
import { TerraCheckboxLeafInterface } from '../leaf/terra-checkbox-leaf.interface';

@Component({
    selector: 'terra-checkbox-tree',
    styles:   [require('./terra-checkbox-tree.component.scss')],
    template: require('./terra-checkbox-tree.component.html')
})
export class TerraCheckboxTreeComponent extends TerraBaseTreeComponent implements OnInit
{

    /**
     * current level leaf list
     */
    @Input() inputLeafList:Array<TerraCheckboxLeafInterface>;

    /**
     * leafs one level higher than current leaf
     */
    @Input() inputParentLeafList:Array<TerraCheckboxLeafInterface>;

    /**
     * complete leaf list for better and faster searching
     */
    @Input() inputCompleteLeafList:Array<TerraCheckboxLeafInterface>;

    constructor()
    {
        super();
    }

    selectedLeafList:Array<TerraCheckboxLeafInterface> = [];

    private onCheckboxValueChange(leaf:TerraCheckboxLeafInterface):void
    {
        this.reverseLeafState(leaf);
        this.recursiveUpdateChildLeafs(leaf);
        this.recursiveUpdateParentLeafs(leaf);
    }

    private reverseLeafState(leaf:TerraCheckboxLeafInterface)
    {
        //reverse flag checkboxChecked
        leaf.checkboxChecked = !leaf.checkboxChecked;

        // reset the isIndeterminate flag on every change
        leaf.isIndeterminate = false;
    }

    private recursiveAddLeafToList(leaf:TerraCheckboxLeafInterface):void
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

    private recursiveUpdateChildLeafs(leaf:TerraCheckboxLeafInterface):void
    {
        if(leaf.subLeafList)
        {
            for(let subLeaf of leaf.subLeafList)
            {
                subLeaf.checkboxChecked = leaf.checkboxChecked;

                if(subLeaf.subLeafList)
                {
                    this.recursiveUpdateChildLeafs(subLeaf);
                }
            }
        }
    }

    private recursiveUpdateParentLeafs(leaf:TerraCheckboxLeafInterface):void
    {
        if(leaf.leafParent)
        {
            let parentLeaf:TerraCheckboxLeafInterface = leaf.leafParent;
            let state:LeafState = this.checkStateOfLeafLevel(parentLeaf);

            // All checkboxes on this leaf level are checked
            if(state.allChildrenAreChecked)
            {
                this.updateStateValuesOfLeaf(parentLeaf, false, true);
            }
            // No checkbox on this leaf level is checked but one or more set to indeterminate
            else if(state.noChildrenAreChecked && state.isIndeterminate)
            {
                this.updateStateValuesOfLeaf(parentLeaf, true, null);
            }
            // No checkbox on this leaf level is checked
            else if(state.noChildrenAreChecked)
            {
                this.updateStateValuesOfLeaf(parentLeaf, false, false);
            }
            // other cases like partial checked or partial indeterminate or mixed
            else
            {
                this.recursiveSetIndeterminateToParent(leaf);
                return;
            }

            this.recursiveUpdateParentLeafs(parentLeaf);
        }
    }

    private updateStateValuesOfLeaf(leaf:TerraCheckboxLeafInterface, isIndeterminate:boolean, checkboxChecked:boolean):void
    {
        leaf.isIndeterminate = isIndeterminate;
        leaf.checkboxChecked = checkboxChecked;
    }

    private checkStateOfLeafLevel(leaf:TerraCheckboxLeafInterface):LeafState
    {
        let leafState:LeafState = new LeafState();

        for(let subLeaf of leaf.subLeafList)
        {
            leafState.allChildrenAreChecked = subLeaf.checkboxChecked && leafState.allChildrenAreChecked;
            leafState.noChildrenAreChecked = !subLeaf.checkboxChecked && leafState.noChildrenAreChecked;
            if(subLeaf.isIndeterminate)
            {
                leafState.isIndeterminate = true;
            }
        }

        return leafState;
    }

    private linkParentsToLeafList(leafList:Array<TerraCheckboxLeafInterface>):void
    {
        for(let leaf of leafList)
        {
            if(leaf.subLeafList)
            {
                for(let subLeaf of leaf.subLeafList)
                {
                    subLeaf.leafParent = leaf;
                    if(subLeaf.subLeafList)
                    {
                        this.linkParentsToLeafList(subLeaf.subLeafList);
                    }
                }
            }
        }
    }

    ngOnInit()
    {
        super.ngOnInit();
        this.linkParentsToLeafList(this.inputLeafList);
    }

    private recursiveSetIndeterminateToParent(leaf:TerraCheckboxLeafInterface):void
    {
        if(leaf.leafParent)
        {
            let parentLeaf:TerraCheckboxLeafInterface = leaf.leafParent;

            this.updateStateValuesOfLeaf(parentLeaf, true, null);
            this.recursiveSetIndeterminateToParent(parentLeaf);
        }
    }
}
export class LeafState
{
    allChildrenAreChecked:boolean = true;
    noChildrenAreChecked:boolean = true;
    isIndeterminate:boolean = false;
}
