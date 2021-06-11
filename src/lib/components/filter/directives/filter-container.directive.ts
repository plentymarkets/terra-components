import { Directive, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterChipDefDirective } from './filter-chip-def.directive';
import { FilterMenuDirective } from './filter-menu.directive';
import { terraFilterClose } from './filter-close.directive';

/** Container for the content of the filter menu. */
@Directive({
    selector: '[terra-filter-container], terra-filter-container, [terraFilterContainer]',
    exportAs: 'terraFilterContainer',
    host: {
        class: 'terra-filter-container'
    }
})
export class FilterContainerDirective {
    /** Observable list of chip definitions. */
    public chips$: Observable<Array<FilterChipDefDirective>>;
    /** Stream to internally manage the list of chip definitions. */
    private _chips$: BehaviorSubject<Array<FilterChipDefDirective>> = new BehaviorSubject([]);

    constructor(
        /** Reference to the filter menu to register themselves for access to the chip definitions. */
        private menu: FilterMenuDirective
    ) {
        this.menu.container = this;
        this.chips$ = this._chips$.asObservable();
    }

    /** Stops propagation of the click event to prevent the menu from being closed. */
    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        if (!event[terraFilterClose]) {
            event.stopPropagation();
        }
    }

    /**
     * Adds the given chip definition to the list.
     * @param chipDef
     */
    public addChipDef(chipDef: FilterChipDefDirective): void {
        this._chips$.next([...this._chips$.value, chipDef]);
    }

    /**
     * Removes the given chip definition.
     * @param chipDef
     */
    public removeChipDef(chipDef: FilterChipDefDirective): void {
        const index: number = this._chips$.value.indexOf(chipDef);
        this._chips$.value.splice(index, 1);
        this._chips$.next([...this._chips$.value]);
    }
}
