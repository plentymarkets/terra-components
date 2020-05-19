import {
    CollectionViewer,
    DataSource
} from '@angular/cdk/collections';
import {
    EMPTY,
    merge,
    Observable,
    Subject
} from 'rxjs';
import {
    debounceTime,
    map,
    switchMap,
    takeUntil,
    tap
} from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {
    PageEvent
} from '@angular/material/paginator';
import { TerraFilter } from './filter';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';
import { HasPaginatorInterface } from './has-paginator.interface';

/**
 * Data Source base class for a data table.
 */
export abstract class TableDataSource<T> extends DataSource<T>
{
    /**
     * The data to display in the table.
     */
    public data:Array<T> = [];

    /**
     * The filter instance
     */
    public filter:TerraFilter<unknown>;

    /**
     * Stream to finish all events.
     */
    private _disconnect$:Subject<void> = new Subject();

    /**
     * Connects a collection viewer (such as a data-table) to this data source. Note that
     * the stream provided will be accessed during change detection and should not directly change
     * values that are bound in template views.
     * @param collectionViewer The component that exposes a view over the data provided by this
     *     data source.
     * @returns Observable that emits a new value when the data changes.
     */
    public connect(collectionViewer:CollectionViewer):Observable<Array<T>>
    {
        return merge(
            this._filtering(),
            this._sorting(),
            this._paging()
        ).pipe(
            takeUntil(this._disconnect$),
            debounceTime(400),
            switchMap(() => this.request()),
             map((response:unknown) =>
             {
                 if(this._isPaginated(response) && this._hasPager(this))
                 {
                     this.paginator.length = response.totalsCount;
                     return response.entries;
                 }
                 return response;
             }),
            tap((data:Array<T>) => this.data = data)
        );
    }

    /**
     * Disconnects a collection viewer (such as a data-table) from this data source. Can be used
     * to perform any clean-up or tear-down operations when a view is being destroyed.
     * @param collectionViewer The component that exposes a view over the data provided by this
     *     data source.
     */
    public disconnect(collectionViewer:CollectionViewer):void
    {
        this._disconnect$.next();
        this._disconnect$.complete();
    }

    /**
     * Executes the search with given request.
     */
    public search():void
    {
        this.filter.search();
    }

    /**
     * The request to get the data. Either paginated or a plain list.
     * @returns Observable<Array<T>>
     */
    public abstract request():Observable<Array<T>> | Observable<TerraPagerInterface<T>>;



    /**
     * Return the sort event or an empty observable.
     * @returns EventEmitter<Sort> or Observable<never>
     */
    protected _sorting():EventEmitter<Sort> | Observable<never>
    {
        return EMPTY;
    }

    /**
     * Return the page event or an empty observable.
     * @returns EventEmitter<PageEvent> or Observable<never>
     */
    protected _paging():EventEmitter<PageEvent> | Observable<never>
    {
        return EMPTY;
    }

    /**
     * Return the filter or an empty observable
     * @returns Observable<unknown>
     */
    protected _filtering():Observable<unknown>
    {
        return this.filter ? this.filter.search$ : EMPTY;
    }

    /**
     * Checks if the given response is a paging response
     * @param response
     */
    private _isPaginated(response:any):response is TerraPagerInterface<T>
    {
        return 'page' in response &&
               'totalsCount' in response &&
               'isLastPage' in response &&
               'lastPageNumber' in response &&
               'firstOnPage' in response &&
               'lastOnPage' in response &&
               'itemsPerPage' in response &&
               'entries' in response;
    }

    /**
     * Check if the given data source has a paginator
     * @param dataSource
     */
    private _hasPager(dataSource:any):dataSource is HasPaginatorInterface
    {
        return 'paginator' in dataSource;
    }
}