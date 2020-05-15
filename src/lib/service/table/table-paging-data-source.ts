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
 */
export abstract class TablePagingDataSource<T> extends TableDataSource<T>
{
    /**
     * @description The paginator instance of the material table.
     */
    private _paginator:MatPaginator;

    // tslint:disable-next-line:get-set
    public get paginator():MatPaginator
    {
        return this._paginator;
    }

    // tslint:disable-next-line:get-set
    public set paginator(paginator:MatPaginator)
    {
        this._paginator = paginator;
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
     * @description Return the page event or an empty observable.
     * @override
     * @returns EventEmitter<PageEvent> or Observable<never>
     */
    protected paging():EventEmitter<PageEvent> | Observable<never>
    {
        return this.paginator ? this.paginator.page : EMPTY;
    }
}
