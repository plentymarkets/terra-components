import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentySplitViewData } from './data/plenty-split-view-data';

@Component({
               selector:  'plenty-split-view',
               // templateUrl: 'plenty-split-view.component.html',
               // styleUrls: ['plenty-split-view.component.css'],
               styles:    [`.side-scroller {
                                position: relative;
                                overflow-x: hidden;
                                white-space: nowrap;
                            }
                            
                            .side-scroller > * {
                                display: inline-block;
                            }
                            
                            .divider {
                                width: 5px;
                                background-color: grey;
                                position: absolute;
                                top: 0px;
                                bottom: 0px;
                            }
                            
                            .divider + * {
                                margin-left: 10px;
                            }`],
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
