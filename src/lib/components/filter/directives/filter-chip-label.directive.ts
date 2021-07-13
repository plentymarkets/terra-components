import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { FilterChipDefDirective } from './filter-chip-def.directive';

/**
 * A directive that must be applied to any element containing the text which
 * should be displayed as the chip's label.
 *
 * @example
 * ```
 * <mat-label terraFilterChipLabel>My label<mat-label>
 * ```
 */
@Directive({
    selector: '[terraFilterChipLabel]'
})
export class FilterChipLabelDirective implements AfterViewInit {
    constructor(
        /** Reference to the element which this directive is attached to. */
        private elementRef: ElementRef,
        /** Reference to the related chip definition. Used to register themselves. */
        private chipDef: FilterChipDefDirective
    ) {}

    public ngAfterViewInit(): void {
        // read the innerText of the element which this directive is applied to and set it as label of the chip def
        this.chipDef.label = (this.elementRef.nativeElement as HTMLElement).innerText;
    }
}
