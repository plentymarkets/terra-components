import { Directive } from '@angular/core';

/** Container for the content in a filter menu. */
@Directive({
    selector: '[terra-filter-content], terra-filter-content, [terraFilterContent]',
    host: {
        class: 'terra-filter-content'
    }
})
export class FilterContentDirective {}
