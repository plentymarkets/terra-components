import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { TerraBaseTreeComponent } from '../base/terra-base-tree.component';
import { TerraCheckboxLeafInterface } from '../leaf/terra-checkbox-leaf.interface';
import { TerraCheckboxTreeLeafState } from './data/terra-checkbox-tree-leaf-state';

@Component({
    selector: 'terra-checkbox-tree',
    styles:   [require('./terra-checkbox-tree.component.scss')],
    template: require('./terra-checkbox-tree.component.html')
})
export class TerraCheckboxTreeComponent extends TerraBaseTreeComponent implements OnInit, OnChanges
{
    /**
     * @description current level leaf list
     */
    @Input()
    public inputLeafList:Array<TerraCheckboxLeafInterface>;

    /**
     * @description leafs one level higher than current leaf
     */
    @Input()
    public inputParentLeafList:Array<TerraCheckboxLeafInterface>;

    /**
     * @description complete leaf list for better and faster searching
     */
    @Input()
    public inputCompleteLeafList:Array<TerraCheckboxLeafInterface>;

    /**
     * @description get the current selected leaf list
     */
    @Output()
    public valueChange:EventEmitter<TerraCheckboxLeafInterface> = new EventEmitter<TerraCheckboxLeafInterface>();

    public selectedLeafList:Array<TerraCheckboxLeafInterface> = [];

    public ngOnInit():void
    {
        super.ngOnInit();
        this.appendParentsToLeafList(this.inputLeafList);
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['inputLeafList'])
        {
            this.appendParentsToLeafList(this.inputLeafList);
        }
    }

    /**
     * @description event which is triggered when any checkbox is clicked
     * @param event
     * @param leaf
     */
    protected onCheckboxValueChange(event:boolean, leaf:TerraCheckboxLeafInterface):void
    {
        if(leaf.isIndeterminate)
        {
            leaf.checkboxChecked = false;
        }
        else
        {
            leaf.checkboxChecked = event;
        }
        this.resetIndeterminateLeafState(leaf);
        this.recursiveUpdateChildLeafs(leaf);
        this.recursiveUpdateParentLeafs(leaf);
        this.valueChange.emit(leaf);
    }

    private resetIndeterminateLeafState(leaf:TerraCheckboxLeafInterface):void
    {
        // reset the isIndeterminate flag on every state change
        leaf.isIndeterminate = false;
    }

    /**
     * @description
     * @param leaf
     */
    private recursiveAddLeafToList(leaf:TerraCheckboxLeafInterface):void
    {
        if(leaf.checkboxChecked)
        {
            this.selectedLeafList.push(leaf);
        }
        else
        {
            let leafIndex:number = this.selectedLeafList.indexOf(leaf);

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

    /**
     * @description
     * @param leaf
     */
    private recursiveUpdateChildLeafs(leaf:TerraCheckboxLeafInterface):void
    {
        if(leaf.subLeafList)
        {
            for(let subLeaf of leaf.subLeafList)
            {
                if(!subLeaf.isDisabled)
                {
                    subLeaf.checkboxChecked = leaf.checkboxChecked;
                }

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
            let parentLeafState:TerraCheckboxTreeLeafState = this.getParentLeafState(parentLeaf);

            // All checkboxes on this leaf level are checked
            if(parentLeafState.allChildrenAreChecked)
            {
                this.updateStateValuesOfLeaf(parentLeaf, false, true);
            }
            // No checkbox on this leaf level is checked but one or more set to indeterminate
            else if(parentLeafState.noChildrenAreChecked && parentLeafState.isIndeterminate)
            {
                this.updateStateValuesOfLeaf(parentLeaf, true, null);
            }
            // No checkbox on this leaf level is checked
            else if(parentLeafState.noChildrenAreChecked)
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

    private getParentLeafState(leaf:TerraCheckboxLeafInterface):TerraCheckboxTreeLeafState
    {
        let parentLeafState:TerraCheckboxTreeLeafState = new TerraCheckboxTreeLeafState();

        for(let subLeaf of leaf.subLeafList)
        {
            parentLeafState.allChildrenAreChecked = subLeaf.checkboxChecked && parentLeafState.allChildrenAreChecked;
            parentLeafState.noChildrenAreChecked = !subLeaf.checkboxChecked && parentLeafState.noChildrenAreChecked;
            if(subLeaf.isIndeterminate)
            {
                parentLeafState.isIndeterminate = true;
            }
        }
        if((!parentLeafState.allChildrenAreChecked && !parentLeafState.noChildrenAreChecked))
        {
            parentLeafState.isIndeterminate = true;
        }

        return parentLeafState;
    }

    private appendParentsToLeafList(leafList:Array<TerraCheckboxLeafInterface>):void
    {
        for(let leaf of leafList)
        {
            this.recursiveAppendParentToSubLeafs(leaf);
        }
    }

    private recursiveAppendParentToSubLeafs(leaf:TerraCheckboxLeafInterface):void
    {
        if(leaf.subLeafList)
        {
            for(let subLeaf of leaf.subLeafList)
            {
                subLeaf.leafParent = leaf;
                this.recursiveAppendParentToSubLeafs(subLeaf);
            }
        }
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


