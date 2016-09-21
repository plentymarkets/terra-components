import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentySplitViewData } from './data/plenty-split-view-data';

@Component({
               selector:  'plenty-split-view',
               styles:    [require('./plenty-split-view.component.scss')],
               template:  require('./plenty-split-view.component.html')
           })
export class PlentySplitViewComponent implements OnInit
{
    @Input() components:Array<PlentySplitViewData>;

    constructor()
    {
    }

    ngOnInit()
    {
    }

}
