import { Component } from '@angular/core';

@Component({
               selector:  'plenty-base-toolbar',
               // templateUrl: 'plenty-base-toolbar.component.html',
               styleUrls: ['plenty-base-toolbar.component.css'],
               template:  `<div class="btn-toolbar" role="toolbar">
                              <ng-content></ng-content>
                            </div>`
           })
export class PlentyBaseToolbar
{
    constructor()
    {
    }
}
