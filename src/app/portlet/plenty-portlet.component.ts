import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
             selector: 'plenty-portlet',
             templateUrl: 'plenty-portlet.component.html',
             styleUrls: ['plenty-portlet.component.css'],
           })

export class PlentyPortlet
{
  @Input() portletHeader:string;

  constructor()
  {
  }
}
