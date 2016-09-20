import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentySplitViewData } from './data/plenty-split-view-data';

@Component({
               selector:  'plenty-split-view',
               // templateUrl: 'plenty-split-view.component.html',
               styleUrls: ['plenty-split-view.component.css'],
               template:  `<plenty-base-toolbar>
                              <ng-content></ng-content>
                            </plenty-base-toolbar>
                            <div class="side-scroller">
                              <template ngFor let-component [ngForOf]="components" let-last="last">
                                <dcl-wrapper [identifier]="test" [type]="component.component" [style.width]="component.defaultWidth"></dcl-wrapper>
                                <div class="divider" *ngIf="!last"></div>
                              </template>
                            </div>`
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
