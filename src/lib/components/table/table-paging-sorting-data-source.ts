import { TableDataSource } from './table-data-source';
import {
    MatSort,
    Sort,
    SortDirection
} from '@angular/material/sort';
import {
    MatPaginator,
    PageEvent
} from '@angular/material/paginator';
import {
    EMPTY,
    Observable
} from 'rxjs';
import { EventEmitter } from '@angular/core';
import { HasPaginatorInterface } from './has-paginator.interface';
import { HasSortingInterface } from './has-sorting.interface';

/**
 * Data Source base class for a data table with pagination and sorting.
 */
export abstract class TablePagingSortingDataSource<T> extends TableDataSource<T> implements HasPaginatorInterface, HasSortingInterface
{
    /**
     * @description The sort instance of the material table.
     */
    public sort:MatSort;

    /**
     * @description The paginator instance of the material table.
     */
    public paginator:MatPaginator;

    /**
     * @description Return the page event or an empty observable.
     * @override
     * @returns EventEmitter<PageEvent> or Observable<never>
     */
    protected _paging():EventEmitter<PageEvent> | Observable<never>
    {
        return this.paginator ? this.paginator.page : EMPTY;
    }

    /**
     * @description Return the sort event or an empty observable.
     * @returns EventEmitter<Sort> or Observable<never>
     */
    protected _sorting():Observable<never> | EventEmitter<Sort>
    {
        return this.sort ? this.sort.sortChange : EMPTY;
    }

    /**
     * @description Get the current page index or undefined if no paginator is specified.
     * @returns number
     */
    public get pageIndex():number
    {
        return this.paginator ? this.paginator.pageIndex + 1 : undefined;
    }

    /**
     * @description Get the current items pet page or undefined if no paginator is specified.
     * @returns number
     */
    public get itemsPerPage():number
    {
        return this.paginator ? this.paginator.pageSize : undefined;
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
