import { Component } from '@angular/core';

@Component({
               selector: 'terra-base-toolbar',
               styles:   [require('./plenty-base-toolbar.component.scss').toString()],
               template: require('./plenty-base-toolbar.component.html')
           })
export class PlentyBaseToolbar
{
    constructor()
    {
    }
}
