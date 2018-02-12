import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
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
    @Input()
    public inputLeafList:Array<TerraCheckboxLeafInterface>;

    /**
     * leafs one level higher than current leaf
     */
    @Input()
    public inputParentLeafList:Array<TerraCheckboxLeafInterface>;

    /**
     * complete leaf list for better and faster searching
     */
    @Input()
    public inputCompleteLeafList:Array<TerraCheckboxLeafInterface>;

    @Output()
    public valueChange:EventEmitter<TerraCheckboxLeafInterface> = new EventEmitter<TerraCheckboxLeafInterface>();

    public selectedLeafList:Array<TerraCheckboxLeafInterface> = [];

    constructor()
    {
        super();
    }

    private onCheckboxValueChange(event:boolean, leaf:TerraCheckboxLeafInterface):void
    {
        leaf.checkboxChecked = event;
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
            let parentLeafState:ParentLeafState = this.getParentLeafState(parentLeaf);

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

    private getParentLeafState(leaf:TerraCheckboxLeafInterface):ParentLeafState
    {
        let parentLeafState:ParentLeafState = new ParentLeafState();

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

    public ngOnInit():void
    {
        super.ngOnInit();
        this.appendParentsToLeafList(this.inputLeafList);
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

export class ParentLeafState
{
    public allChildrenAreChecked:boolean = true;
    public noChildrenAreChecked:boolean = true;
    public isIndeterminate:boolean = false;
}
