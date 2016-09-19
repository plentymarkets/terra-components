import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentySplitViewData } from './data/plenty-split-view-data';

@Component({
               selector:    'plenty-split-view',
               templateUrl: 'plenty-split-view.component.html',
               styleUrls:   ['plenty-split-view.component.css']
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
