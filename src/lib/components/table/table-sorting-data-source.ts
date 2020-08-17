import { TableDataSource } from './table-data-source';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { EMPTY, Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { HasSortingInterface } from './has-sorting.interface';
import { debounceTime } from 'rxjs/operators';

/**
 * Data Source base class for a data table with sorting.
 * @experimental
 */
export abstract class TableSortingDataSource<T> extends TableDataSource<T> implements HasSortingInterface {
    /**
     * @description The sort instance of the material table.
     */
    public sort: MatSort;

    /**
     * @description Return the sort event or an empty observable.
     * @returns EventEmitter<Sort> or Observable<never>
     */
    protected _sorting(): Observable<Sort> | Observable<never> {
        return this.sort ? this.sort.sortChange.pipe(debounceTime(400)) : EMPTY;
    }

    /**
     * @description Get the current sorting key.
     * @returns string
     */
    public get sortBy(): string {
        return this.sort ? this.sort.active : '';
    }

    /**
     * @description Get the current sorting direction.
     * @returns SortDirection
     */
    public get sortDirection(): SortDirection {
        return this.sort ? this.sort.direction : '';
    }
}
