import {
    Component,
    Input
} from '@angular/core';
import { TerraBaseTreeComponent } from './base/terra-base-tree.component';
import { TerraLeafInterface } from './leaf/terra-leaf.interface';

@Component({
    selector: 'terra-tree',
    styles:   [require('./terra-tree.component.scss')],
    template: require('./terra-tree.component.html')
})
export class TerraTreeComponent extends TerraBaseTreeComponent
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
}
