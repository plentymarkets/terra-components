import { TableDataSource } from './table-data-source';
import {
    EMPTY,
    Observable
} from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { merge } from 'rxjs';
import {
    debounceTime,
    switchMap,
    takeUntil,
    tap
} from 'rxjs/operators';

export abstract class TablePagingDataSource<T> extends TableDataSource<T>
{
    public paginator:MatPaginator;

    public connect(collectionViewer:CollectionViewer):Observable<Array<T>>
    {
        return merge(
            this._search$,
            this.paginator ? this.paginator.page : EMPTY
        ).pipe(
            takeUntil(this._disconnect$),
            debounceTime(400),
            switchMap(() => this.request()),
            tap((data:Array<T>) => this.data = data)
        );
    }

    public disconnect(collectionViewer:CollectionViewer):void
    {
        super.disconnect(collectionViewer);
    }

    public get pageIndex():number
    {
        return this.paginator ? this.paginator.pageIndex + 1 : undefined;
    }

    public get itemsPerPage():number
    {
        return this.paginator ? this.paginator.pageSize : undefined;
    }
}
