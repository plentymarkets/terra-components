import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'terra-base-toolbar',
    styleUrls: ['./terra-base-toolbar.component.scss'],
    templateUrl: './terra-base-toolbar.component.html'
})

/** @deprecated since v5.0. Please use mat-toolbar instead */
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

    @HostBinding('class.terra-sticky-toolbar')
    public get sticky(): boolean {
        return this.isSticky;
    }

    constructor() {
        this.isSticky = false;
        this.inputIsBreadcrumbs = false;
    }
}
