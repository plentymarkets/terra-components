import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraBaseTreeComponent } from '../base/terra-base-tree.component';
import { TerraLeafInterface } from '../leaf/terra-leaf.interface';

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

    onCheckboxValueChange(leaf:TerraLeafInterface)
    {
        leaf.checkboxChecked = !leaf.checkboxChecked;
        leaf.isIndeterminate = false;
        this.recursiveCheckboxCheck(leaf);
        this.recursiveCheckParentLeafs(leaf);
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

    recursiveCheckboxCheck(leaf:TerraLeafInterface):void
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

    private recursiveCheckParentLeafs(leaf:TerraLeafInterface):void
    {
        let allChildrenChecked:boolean = true;
        let noChildChecked:boolean = true;
        let isIndeterminate:boolean = false;

        if(leaf.leafParent)
        {
            for(let subLeaf:TerraLeafInterface of leaf.leafParent.subLeafList)
            {
                allChildrenChecked = subLeaf.checkboxChecked && allChildrenChecked;
                noChildChecked = !subLeaf.checkboxChecked && noChildChecked;
                if(subLeaf.isIndeterminate)
                {
                    isIndeterminate = subLeaf.isIndeterminate;
                }
            }
            if(allChildrenChecked)
            {
                leaf.leafParent.isIndeterminate = false;
                leaf.leafParent.checkboxChecked = true;
                this.recursiveCheckParentLeafs(leaf.leafParent);
            }
            else if(noChildChecked && isIndeterminate)
            {
                leaf.leafParent.checkboxChecked = null;
                leaf.leafParent.isIndeterminate = true;
                this.recursiveCheckParentLeafs(leaf.leafParent);
            }
            else if(noChildChecked)
            {
                leaf.leafParent.isIndeterminate = false;
                leaf.leafParent.checkboxChecked = false;
                this.recursiveCheckParentLeafs(leaf.leafParent);
            }
            else
            {
                leaf.leafParent.checkboxChecked = null;
                leaf.leafParent.isIndeterminate = true;
                if(leaf.leafParent.leafParent)
                {
                    this.recursiveSetIndeterminate(leaf.leafParent.leafParent);
                }
            }
        }
    }

    private linkParentsToLeafList(leafList:Array<TerraLeafInterface>):void
    {
        for(let leaf:TerraLeafInterface of leafList)
        {
            if(leaf.subLeafList)
            {
                for(let subLeaf:TerraLeafInterface of leaf.subLeafList)
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

    private recursiveSetIndeterminate(leaf:TerraLeafInterface):void
    {
        leaf.checkboxChecked = null;
        leaf.isIndeterminate = true;
        if(leaf.leafParent)
        {
            this.recursiveSetIndeterminate(leaf.leafParent);
        }
    }
}
