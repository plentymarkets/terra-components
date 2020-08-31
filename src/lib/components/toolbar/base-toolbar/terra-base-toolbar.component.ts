import { Component, Input } from '@angular/core';

@Component({
    selector: 'terra-base-toolbar',
    styleUrls: ['./terra-base-toolbar.component.scss'],
    templateUrl: './terra-base-toolbar.component.html',
    host: { '[class.terra-sticky-toolbar]': 'isSticky' }
})
export class TerraBaseToolbarComponent {
    /**
     * @deprecated since v4. Breadcrumbs have its own styles now.
     */
    @Input()
    public inputIsBreadcrumbs: boolean;

    /**
     * @description makes toolbar stick to the top while scrolling
     */
    @Input()
    public isSticky: boolean;

    constructor() {
        this.isSticky = false;
        this.inputIsBreadcrumbs = false;
    }
}
