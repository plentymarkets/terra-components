import {
    Component,
    Input
} from '@angular/core';
import { HostBinding } from '@angular/compiler/src/core';

@Component({
    selector: 'terra-base-toolbar',
    template: require('./terra-base-toolbar.component.html'),
    styles:   [require('./terra-base-toolbar.component.scss')],
    host:     {'[class.terra-sticky-toolbar]':'isSticky'}
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
    public isSticky:boolean;

    constructor()
    {
        this.inputIsBreadcrumbs = false;
    }
}
