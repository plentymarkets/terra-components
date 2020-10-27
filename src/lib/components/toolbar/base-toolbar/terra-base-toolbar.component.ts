import { Component, Input } from '@angular/core';

@Component({
    selector: 'terra-base-toolbar',
    styleUrls: ['./terra-base-toolbar.component.scss'],
    templateUrl: './terra-base-toolbar.component.html',
    host: { '[class.terra-sticky-toolbar]': 'isSticky' }
})

/** @deprecated since v5.0. Please use mat-toolbar instead */
export class TerraBaseToolbarComponent {
    /**
     * @description makes toolbar stick to the top while scrolling
     */
    @Input()
    public isSticky: boolean = false;
}
