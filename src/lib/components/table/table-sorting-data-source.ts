import { TableDataSource } from './table-data-source';
import {
    MatSort,
    Sort,
    SortDirection
} from '@angular/material/sort';
import {
    EMPTY,
    Observable
} from 'rxjs';
import { EventEmitter } from '@angular/core';
import { HasSortingInterface } from './has-sorting.interface';

/**
 * @description Data Source base class for a data table with sorting.
 */
export abstract class TableSortingDataSource<T> extends TableDataSource<T> implements HasSortingInterface
{
    /**
     * @description The sort instance of the material table.
     */
    public sort:MatSort;

    /**
     * @description Return the sort event or an empty observable.
     * @returns EventEmitter<Sort> or Observable<never>
     */
    protected sorting():Observable<never> | EventEmitter<Sort>
    {
        return this.sort ? this.sort.sortChange : EMPTY;
    }

    /**
     * @description Get the current sorting key.
     * @returns string
     */
    public get sortBy():string
    {
        return this.sort ? this.sort.active : '';
    }

    /**
     * @description Get the current sorting direction.
     * @returns SortDirection
     */
    public get sortDirection():SortDirection
    {
        return this.sort ? this.sort.direction : '';
    }
}
