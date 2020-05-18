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
import { HasPaginatorInterface } from './has-paginator.interface';

/**
 * Data Source base class for a data table with pagination.
 */
export abstract class TablePagingDataSource<T> extends TableDataSource<T> implements HasPaginatorInterface
{
    /**
     * @description The paginator instance of the material table.
     */
    public paginator:MatPaginator;

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
     * @description Return the page event or an empty observable.
     * @override
     * @returns EventEmitter<PageEvent> or Observable<never>
     */
    protected _paging():EventEmitter<PageEvent> | Observable<never>
    {
        return this.paginator ? this.paginator.page : EMPTY;
    }
}
