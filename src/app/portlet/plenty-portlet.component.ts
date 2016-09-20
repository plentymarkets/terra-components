import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
               selector:  'plenty-portlet',
               // templateUrl: 'plenty-portlet.component.html',
               styleUrls: ['plenty-portlet.component.css'],
               template:  `<div class="portlet">
                              <div class="portlet_head">
                                {{portletHeader}}
                              </div>
                              <div class="portlet_body">
                                <ng-content></ng-content>
                              </div>
                            </div>`
           })

export class PlentyPortlet
{
    @Input() portletHeader:string;

    constructor()
    {
    }
}
