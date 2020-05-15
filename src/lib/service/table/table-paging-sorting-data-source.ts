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
import { CollectionViewer } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';

/**
 * Data Source base class for a data table with pagination and sorting.
 */
export abstract class TablePagingSortingDataSource<T> extends TableDataSource<T>
{
    /**
     * @description The paginator instance of the material table.
     */
    public paginator:MatPaginator;
    /**
     * @description The sort instance of the material table.
     */
    public sort:MatSort;

    /**
     * @description Connects a collection viewer (such as a data-table) to this data source. Note that
     * the stream provided will be accessed during change detection and should not directly change
     * values that are bound in template views.
     * @param collectionViewer The component that exposes a view over the data provided by this
     *     data source.
     * @returns Observable that emits a new value when the data changes.
     */
    public connect(collectionViewer:CollectionViewer):Observable<Array<T>>
    {
        // If the user changes the sort order, reset back to the first page.
        if(this.sort)
        {
            this.sort.sortChange.pipe(
                takeUntil(this._disconnect$)
            ).subscribe(() => this.paginator.pageIndex = 0);
        }

        return super.connect(collectionViewer);
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

    /**
     * @description Return the sort event or an empty observable.
     * @returns EventEmitter<Sort> or Observable<never>
     */
    protected sorting():Observable<never> | EventEmitter<Sort>
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
