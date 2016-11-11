import {
    Component,
    ViewEncapsulation
} from '@angular/core';

@Component({
               selector:      'demo-view',
               styles:        [require('./demo-view.component.scss').toString()],
               template:      require('./demo-view.component.html'),
               encapsulation: ViewEncapsulation.None,
           })
export class DemoViewComponent
{
    
    constructor()
    {
    }
}
