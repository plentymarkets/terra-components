import { Directive } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { FilterContainerDirective } from './filter-container.directive';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/** A directive collecting references to the form, menu and the filter-container */
@Directive({
    selector: '[terraFilterMenu]',
    exportAs: 'terraFilterMenu'
})
export class FilterMenuDirective {
    /** A Stream that emits whenever the reference to the FilterContainerDirective is updated. */
    public container$!: Observable<FilterContainerDirective>;

    /** Reference to the filter container. Gives access to the chip definitions. */
    public get container(): FilterContainerDirective | undefined {
        return this._container$.getValue();
    }
    public set container(value: FilterContainerDirective | undefined) {
        this._container$.next(value);
    }
    private _container$: BehaviorSubject<FilterContainerDirective | undefined> = new BehaviorSubject<
        FilterContainerDirective | undefined
    >(undefined);

    constructor(
        /** Reference to the material menu. */
        public menu: MatMenu
    ) {
        this.container$ = this._container$.asObservable().pipe(
            filter((container: FilterContainerDirective | undefined): container is FilterContainerDirective => {
                return container instanceof FilterContainerDirective;
            })
        );
        // add our custom class to the menu panel
        this.menu.panelClass = 'terra-filter-menu';
    }
}
