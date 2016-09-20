import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentyTaglist } from '../taglist/plenty-taglist.component';
import { PlentyButton } from '../button/plenty-button.component';

@Component({
               selector:  'plenty-infobox',
               // templateUrl: 'plenty-infobox.component.html',
               styleUrls: ['plenty-infobox.component.css'],
               template:  `<div class="col-xs-12 infobox">
                              <div class="infobox-inner">
                                <div class="col-xs-10 infobox-text">
                                  <ng-content></ng-content>
                                </div>
                                <div class="btn-group-vertical" role="group">
                                  <template ngFor let-button [ngForOf]="buttonList">
                                    <plenty-button class="col-xs-2 btn-group-vertical" role="group" (clicked)="button.clickFunction()" icon="{{button.icon}}" caption="{{button.caption}}" [isSmall]="true" tooltipText="{{button.tooltipText}}"></plenty-button>
                                  </template>
                                </div>
                                <plenty-taglist [tagList]="tagList"></plenty-taglist>
                              </div>
                            </div>`
           })
export class PlentyInfobox implements OnInit
{
    @Input() tagList:Array<PlentyTaglist>;
    @Input() buttonList:Array<PlentyButton>;

    constructor()
    {
    }

    ngOnInit()
    {
    }

}
