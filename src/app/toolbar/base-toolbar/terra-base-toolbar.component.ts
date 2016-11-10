import { Component } from '@angular/core';

@Component({
               selector: 'terra-base-toolbar',
               styles:   [require('./terra-base-toolbar.component.scss').toString()],
               template: require('./terra-base-toolbar.component.html')
           })
export class TerraBaseToolbarComponent
{
    constructor()
    {
    }
}
