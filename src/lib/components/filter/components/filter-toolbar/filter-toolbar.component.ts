import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FilterChipDefDirective } from '../../directives/filter-chip-def.directive';
import { FilterMenuDirective } from '../../directives/filter-menu.directive';
import { Observable } from 'rxjs';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

/** A toolbar providing necessary elements for applying filters to a table. */
@Component({
    selector: 'terra-filter-toolbar',
    templateUrl: './filter-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterToolbarComponent {
    /** Reference to the FilterMenuDirective containing all information needed to render the chips */
    @Input()
    public filterMenu: FilterMenuDirective;

    /** Fires when the user clicks the search button in the filter toolbar */
    @Output()
    public search: EventEmitter<void> = new EventEmitter();

    @Output()
    public searchFilterInputAddition = new EventEmitter<{ chip: FilterChipDefDirective; value: any }>();

    /** Reference to the MatMenuTrigger */
    @ViewChild(MatMenuTrigger)
    public menuTrigger: MatMenuTrigger;

    @Input()
    public enableSearchInput: boolean;

    /** List of chip definitions retrieved by the FilterContainerDirective */
    public get chips$(): Observable<Array<FilterChipDefDirective>> | undefined {
        return this.filterMenu.container ? this.filterMenu.container.chips$ : undefined;
    }

    public shouldDisplay(chip: FilterChipDefDirective) {
        //TODO continue from here
        const type = typeof chip.control.control.value;
        return type === 'number' || type === 'string';
    }

    /** Reference to the material menu containing the filter form */
    public get menu(): MatMenu {
        return this.filterMenu.menu;
    }

    public _onInputSearch() {
        this.search.emit();
    }

    public _onSearchInputFilterAddition(event, chip: FilterChipDefDirective, value: any) {
        this.searchFilterInputAddition.emit({ chip, value });
    }
}
