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
    switchMap,
    takeUntil,
    tap
} from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

/**
 * @description Data Source base class for a data table.
 * @extends DataSource<T>
 */
export abstract class TableDataSource<T> extends DataSource<T>
{
    /**
     * @description The data to display in the table.
     */
    public data:Array<T> = [];

    /**
     * @description Stream to trigger the search.
     */
    protected _search$:Subject<void> = new Subject();

    /**
     * @description Stream to finish all events.
     */
    protected _disconnect$:Subject<void> = new Subject();

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
        return merge(
            this._search$,
            this.sorting(),
            this.paging()
        ).pipe(
            takeUntil(this._disconnect$),
            debounceTime(400),
            switchMap(() => this.request()),
            tap((data:Array<T>) => this.data = data)
        );
    }

    /**
     * @description Disconnects a collection viewer (such as a data-table) from this data source. Can be used
     * to perform any clean-up or tear-down operations when a view is being destroyed.
     *
     * @param collectionViewer The component that exposes a view over the data provided by this
     *     data source.
     */
    public disconnect(collectionViewer:CollectionViewer):void
    {
        this._disconnect$.next();
        this._disconnect$.complete();
    }

    /**
     * @description Executes the search with given request.
     */
    public search():void
    {
        this._search$.next();
    }

    /**
     * @description The request to get the data.
     * @returns {Observable<Array<T>>}
     */
    public abstract request():Observable<Array<T>>;

    /**
     * @description Return the sort event or an empty observable.
     * @returns {EventEmitter<Sort>} or {Observable<never>}
     */
    protected sorting():EventEmitter<Sort> | Observable<never>
    {
        return EMPTY;
    }

    /**
     * @description Return the page event or an empty observable.
     * @returns {EventEmitter<PageEvent>} or {Observable<never>}
     */
    protected paging():EventEmitter<PageEvent> | Observable<never>
    {
        return EMPTY;
    }
}
