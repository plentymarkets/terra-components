import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { FilterChipDefDirective } from '../../directives/filter-chip-def.directive';
import { FilterMenuDirective } from '../../directives/filter-menu.directive';
import { Observable, of } from 'rxjs';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { switchMap } from 'rxjs/operators';
import { FilterContainerDirective } from '../../directives/filter-container.directive';

/** A toolbar providing necessary elements for applying filters to a table. */
@Component({
    selector: 'terra-filter-toolbar',
    templateUrl: './filter-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterToolbarComponent implements OnChanges {
    /** Reference to the FilterMenuDirective containing all information needed to render the chips */
    @Input()
    public filterMenu: FilterMenuDirective | undefined;

    /** Fires when the user clicks the search button in the filter toolbar */
    @Output()
    public search: EventEmitter<void> = new EventEmitter();

    /** Reference to the MatMenuTrigger */
    @ViewChild(MatMenuTrigger)
    public menuTrigger!: MatMenuTrigger;

    /** List of chip definitions retrieved by the FilterContainerDirective */
    public _chips$: Observable<Array<FilterChipDefDirective>> | undefined;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('filterMenu')) {
            this._chips$ = this.filterMenu?.container$.pipe(
                switchMap((container: FilterContainerDirective | undefined) => (container ? container.chips$ : of([])))
            );
        }
    }

    /** Reference to the material menu containing the filter form */
    public get menu(): MatMenu | undefined {
        return this.filterMenu?.menu;
    }
}
