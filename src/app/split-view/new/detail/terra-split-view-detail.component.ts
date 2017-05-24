import {
    Component,
    Input
} from '@angular/core';
import { TerraSplitViewIn } from '../data/terra-split-view-in';

@Component({
               selector: 'terra-split-view-detail',
               template: require('./terra-split-view-detail.component.html'),
               styles:   [require('./terra-split-view-detail.component.scss')]
           })
export class TerraSplitViewDetailComponent
{
    @Input() inputView:TerraSplitViewIn;
    @Input() inputIndex:number;
    @Input() inputLast:boolean;
    @Input() inputFirst:boolean;
}