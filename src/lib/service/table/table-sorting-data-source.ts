import { TableDataSource } from './table-data-source';
import {
    MatSort,
    SortDirection
} from '@angular/material/sort';
import {
    debounceTime,
    switchMap,
    takeUntil,
    tap
} from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';
import {
    EMPTY,
    merge,
    Observable
} from 'rxjs';

export abstract class TableSortingDataSource<T> extends TableDataSource<T>
{
    public sort:MatSort;

    public connect(collectionViewer:CollectionViewer):Observable<Array<T>>
    {
        return merge(
            this._search$,
            this.sort ? this.sort.sortChange : EMPTY
        ).pipe(
            takeUntil(this._disconnect$),
            debounceTime(400),
            switchMap(() => this.request()),
            tap((data:Array<T>) => this.data = data)
        );
    }

    public get sortBy():string
    {
        return this.sort ? this.sort.active : '';
    }

    public get sortDirection():SortDirection
    {
        return this.sort ? this.sort.direction : '';
    }
}
