import {
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { PlentyBaseTree } from "./base/plenty-base-tree.component";
import { PlentyLeaf } from './leaf/plenty-leaf.component';

@Component({
               selector:      'plenty-tree',
               styles:        [require('./plenty-tree.component.scss').toString()],
               template:      require('./plenty-tree.component.html'),
               encapsulation: ViewEncapsulation.None
           })
export class PlentyTree extends PlentyBaseTree
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
}
