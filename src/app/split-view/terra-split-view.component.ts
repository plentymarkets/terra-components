import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';

@Component({
               selector: 'terra-split-view',
               styles:   [require('./terra-split-view.component.scss').toString()],
               template: require('./terra-split-view.component.html')
           })
export class TerraSplitViewComponent implements OnInit
{
    @Input() inputComponents:Array<TerraSplitViewInterface>;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
    
}
