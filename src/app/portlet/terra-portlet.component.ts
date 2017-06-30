import {
    Component,
    Input
} from '@angular/core';

@Component({
               selector: 'terra-portlet',
               styles:   [require('./terra-portlet.component.scss')],
               template: require('./terra-portlet.component.html')
           })
export class TerraPortletComponent
{
    @Input() inputPortletHeader:string;

    constructor()
    {
    }
}
