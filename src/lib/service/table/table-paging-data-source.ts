import { TableDataSource } from './table-data-source';
import {
    EMPTY,
    Observable
} from 'rxjs';
import {
    MatPaginator,
    PageEvent
} from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';

/**
 * Data Source base class for a data table with pagination.
 * @extends TableDataSource<T>
 */
export abstract class TablePagingDataSource<T> extends TableDataSource<T>
{
    /**
     * The paginator instance of the data table
     */
    public paginator:MatPaginator;

    /**
     * Get the current page index or undefined if no paginator is specified
     * @returns {number}
     */
    public get pageIndex():number
    {
        return this.paginator ? this.paginator.pageIndex + 1 : undefined;
    }

    /**
     * Get the current items pet page or undefined if no paginator is specified
     * @returns {number}
     */
    public get itemsPerPage():number
    {
        return this.paginator ? this.paginator.pageSize : undefined;
    }

    /**
     * Return the paginator or an empty observable
     * @override
     * @returns {EventEmitter<PageEvent>} or {Observable<never>}
     */
    protected paging():EventEmitter<PageEvent> | Observable<never>
    {
        return this.paginator ? this.paginator.page : EMPTY;
    }
}
