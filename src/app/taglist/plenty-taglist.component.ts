import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentyTag } from '../tag/plenty-tag.component';

@Component({
               selector: 'plenty-taglist',
               // templateUrl: 'plenty-taglist.component.html',
               // styleUrls: ['plenty-taglist.component.css'],
               styles:   [``],
               template: `<div class="col-xs-12 taglist">
                              <template ngFor let-tag [ngForOf]="tagList">
                                <plenty-tag [badge]="tag.badge"></plenty-tag>
                              </template>
                            </div>`
           })
export class PlentyTaglist implements OnInit
{
    @Input() tagList:Array<PlentyTag>;

    constructor()
    {
    }

    ngOnInit()
    {
    }
}
