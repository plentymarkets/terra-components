import { Directive } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { FilterContainerDirective } from './filter-container.directive';

/** A directive collecting references to the form, menu and the filter-container */
@Directive({
    selector: '[terraFilterMenu]',
    exportAs: 'terraFilterMenu'
})
export class FilterMenuDirective {
    /** Reference to the filter container. Gives access to the chip definitions. */
    public container: FilterContainerDirective;

    constructor(
        /** Reference to the material menu. */
        public menu: MatMenu
    ) {
        // add our custom class to the menu panel
        this.menu.panelClass = 'terra-filter-menu';
    }
}
