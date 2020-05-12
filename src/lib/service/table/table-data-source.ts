import {
    CollectionViewer,
    DataSource
} from '@angular/cdk/collections';
import {
    Observable,
    Subject
} from 'rxjs';
import {
    debounceTime,
    switchMap,
    takeUntil,
    tap
} from 'rxjs/operators';

export abstract class TableDataSource<T> extends DataSource<T>
{
    public data:Array<T> = [];

    private search$:Subject<void> = new Subject();
    private disconnect$:Subject<void> = new Subject();

    public connect(collectionViewer:CollectionViewer):Observable<Array<T>>
    {
        return this.search$.pipe(
            takeUntil(this.disconnect$),
            debounceTime(400),
            switchMap(() => this.request()),
            tap((data:Array<T>) => this.data = data)
        );
    }

    public disconnect(collectionViewer:CollectionViewer):void
    {
        this.disconnect$.next();
        this.disconnect$.complete();
    }

    public search():void
    {
        this.search$.next();
    }

    public abstract request():Observable<Array<T>>;
}
