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
 * Base class for a data when a pagination is needed.
 * @extends TableDataSource<T>
 */
export abstract class TablePagingDataSource<T> extends TableDataSource<T>
{
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
     * @override
     * Return the paginator or an empty observable
     */
    protected paging():Observable<never> | EventEmitter<PageEvent>
    {
        return this.paginator ? this.paginator.page : EMPTY;
    }
}
