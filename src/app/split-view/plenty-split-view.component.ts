import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentySplitViewData } from './data/plenty-split-view-data';

@Component({
               selector: 'terra-split-view',
               styles:   [require('./plenty-split-view.component.scss').toString()],
               template: require('./plenty-split-view.component.html')
           })
export class PlentySplitViewComponent implements OnInit
{
    @Input() inputComponents:Array<PlentySplitViewData>;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
    
}
