import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'terra-base-toolbar',
    styles:   [
        require('./terra-base-toolbar.component.scss'),
        require('./terra-base-toolbar.component.glob.scss').toString()
    ],
    template: require('./terra-base-toolbar.component.html')
})
export class TerraBaseToolbarComponent
{

    @Input() inputIsSticky:boolean;

    constructor()
    {
        this.inputIsSticky = false;
    }
}
