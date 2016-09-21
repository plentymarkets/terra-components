import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
               selector: 'plenty-portlet',
               styles:   [require('./plenty-portlet.component.scss')],
               template: require('./plenty-portlet.component.html')
           })

export class PlentyPortlet
{
    @Input() portletHeader:string;

    constructor()
    {
    }
}
