import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FilterChipDefDirective } from '../../directives/filter-chip-def.directive';
import { FilterMenuDirective } from '../../directives/filter-menu.directive';
import { Observable, timer } from 'rxjs';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';

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

    /** Fires when an option is selected from the autocomplete */
    @Output()
    public optionSelected: EventEmitter<{ event: MatAutocompleteSelectedEvent; value: string }> = new EventEmitter();

    /** Reference to the MatMenuTrigger */
    @ViewChild(MatMenuTrigger)
    public menuTrigger: MatMenuTrigger;

    /** If set to true, then it will display the search input autocomplete */
    @Input()
    public enableSearchInput: boolean;

    @ViewChild(MatAutocompleteTrigger)
    public matAutocompleteTrigger: MatAutocompleteTrigger;

    /** The list of possible labels for the autocomplete menu */
    @Input()
    public autocompleteLabels: Array<string>;

    /** Form control for the autocomplete search input */
    public searchInputControl: FormControl = new FormControl('');

    /** List of chip definitions retrieved by the FilterContainerDirective */
    public get chips$(): Observable<Array<FilterChipDefDirective>> | undefined {
        return this.filterMenu.container ? this.filterMenu.container.chips$ : undefined;
    }

    /** Reference to the material menu containing the filter form */
    public get menu(): MatMenu {
        return this.filterMenu.menu;
    }

    /** Called when the search icon is clicked from the search input box */
    public _onInputSearch(): void {
        this.search.emit();
    }

    /** Called when the an option from the autocomplete menu is selected */
    public _onOptionSelected(event: MatAutocompleteSelectedEvent, value: string): void {
        this.optionSelected.emit({ event, value });
        this.searchInputControl.reset();
    }

    public closeAutocompletePanel(event: Event, option: string): void {
        event.stopPropagation();
        if (option === 'search') {
            this.search.emit();
        }
    }
}
