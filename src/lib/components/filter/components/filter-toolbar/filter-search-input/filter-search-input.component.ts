import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// import { FilterChipDefDirective } from '../../directives/filter-chip-def.directive';
// import { FilterMenuDirective } from '../../directives/filter-menu.directive';
import { Observable } from 'rxjs';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatOptionSelectionChange } from '@angular/material/core';
import { FilterChipDefDirective, FilterMenuDirective } from '../../..';

/** A toolbar providing necessary elements for applying filters to a table. */
@Component({
    selector: 'terra-filter-toolbar-search-input',
    templateUrl: './filter-search-input.component.html',
    styleUrls: ['./filter-search-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterToolbarSearchInputComponent {
    /** Reference to the FilterMenuDirective containing all information needed to render the chips */
    @Input()
    public filterMenu: FilterMenuDirective;

    /** Fires when the user clicks the search button in the filter toolbar */
    @Output()
    public search: EventEmitter<void> = new EventEmitter();

    @Output()
    public searchFilterAddition = new EventEmitter<{ chip: FilterChipDefDirective; value: any }>();

    /** Reference to the MatMenuTrigger */
    @ViewChild(MatMenuTrigger)
    public menuTrigger: MatMenuTrigger;

    /** Reference to the material menu containing the filter form */
    public get menu(): MatMenu {
        return this.filterMenu.menu;
    }

    /** List of chip definitions retrieved by the FilterContainerDirective */
    public get chips$(): Observable<Array<FilterChipDefDirective>> | undefined {
        return this.filterMenu.container ? this.filterMenu.container.chips$ : undefined;
    }

    public _onSelectionChange(event: MatOptionSelectionChange, chip: FilterChipDefDirective, value: string): void {
        if (!event.isUserInput || !value) {
            return;
        }

        this.searchFilterAddition.emit({ chip, value });
    }
}
