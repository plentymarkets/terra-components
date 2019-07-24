import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'terra-base-toolbar',
    template: require('./terra-base-toolbar.component.html'),
    styles:   [require('./terra-base-toolbar.component.scss')]
})
export class TerraBaseToolbarComponent
{
    @Input()
    public inputIsBreadcrumbs:boolean;

    constructor()
    {
        this.inputIsBreadcrumbs = false;
    }
}
