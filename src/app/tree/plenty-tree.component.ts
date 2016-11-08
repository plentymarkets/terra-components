import {
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { PlentyBaseTree } from "./base/plenty-base-tree.component";
import { PlentyLeaf } from './leaf/plenty-leaf.component';

@Component({
               selector: 'plenty-tree',
               styles:   [require('./plenty-tree.component.scss').toString()],
               encapsulation: ViewEncapsulation.None,
               template: require('./plenty-tree.component.html')
           })
export class PlentyTree extends PlentyBaseTree
{

    /**
     * current level leaf list
     */
    @Input() leafList:Array<PlentyLeaf>;

    /**
     * leafs one level higher than current leaf
     */
    @Input() parentLeafList:Array<PlentyLeaf>;

    constructor()
    {
        super();
    }
}
