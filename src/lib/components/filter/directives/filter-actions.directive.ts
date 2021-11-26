import { Directive } from '@angular/core';

/** Container for the bottom action buttons in a filter menu. */
@Directive({
    selector: '[terra-filter-actions], terra-filter-actions, [terraFilterActions]',
    host: {
        class: 'terra-filter-actions'
    }
})
export class FilterActionsDirective {}
