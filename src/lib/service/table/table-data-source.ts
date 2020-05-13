import {
    CollectionViewer,
    DataSource
} from '@angular/cdk/collections';
import {
    EMPTY,
    merge,
    Observable,
    of,
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

export abstract class TableDataSource<T> extends DataSource<T>
{
    public data:Array<T> = [];

    protected _search$:Subject<void> = new Subject();
    protected _disconnect$:Subject<void> = new Subject();

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

    public disconnect(collectionViewer:CollectionViewer):void
    {
        this._disconnect$.next();
        this._disconnect$.complete();
    }

    public search():void
    {
        this._search$.next();
    }

    public abstract request():Observable<Array<T>>;

    protected sorting():Observable<never> | EventEmitter<Sort>
    {
        return EMPTY;
    }

    protected paging():Observable<never> | EventEmitter<PageEvent>
    {
        return EMPTY;
    }
}
