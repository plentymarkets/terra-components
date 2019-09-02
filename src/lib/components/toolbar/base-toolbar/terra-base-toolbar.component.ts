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
    /**
     * @deprecated since v4. Breadcrumbs have its own styles now.
     */
    @Input()
    public inputIsBreadcrumbs:boolean;

    /**
     * @description makes toolbar stick to the top while scrolling
     */
    @Input()
    public isSticky:boolean = false;


    constructor()
    {
        this.inputIsBreadcrumbs = false;
    }
}
