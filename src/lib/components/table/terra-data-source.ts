import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, EMPTY, merge, Observable, Subject, Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { createRequestParams, isPaginated } from './util';
import { RequestParameterInterface } from './request-parameter.interface';
import { TerraFilter } from './filter';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';

export abstract class TerraDataSource<T> extends DataSource<T> {
    public get data(): Array<T> {
        return this._data.value;
    }
    public set data(data: Array<T>) {
        this._data.next(data);
    }
    private _data: BehaviorSubject<Array<T>> = new BehaviorSubject([]);

    public get filter(): TerraFilter<Object> {
        return this._filter;
    }
    public set filter(f: TerraFilter<Object>) {
        this._filter = f;
        this._updateSubscription();
    }
    private _filter: TerraFilter<Object> | undefined;

    public get sort(): MatSort {
        return this._sort;
    }
    public set sort(s: MatSort) {
        this._sort = s;
        this._updateSubscription();
    }
    private _sort: MatSort | undefined;

    public get paginator(): MatPaginator {
        return this._paginator;
    }
    public set paginator(p: MatPaginator) {
        this._paginator = p;
        this._updateSubscription();
    }
    private _paginator: MatPaginator | undefined;

    private _search: Subject<void> = new Subject();
    private _subscription: Subscription = Subscription.EMPTY;

    /**
     * The request to get the data. Either paginated or a plain list.
     * @returns Observable<Array<T> | TerraPagerInterface<T>>
     */
    public abstract request(requestParams: RequestParameterInterface): Observable<Array<T> | TerraPagerInterface<T>>;

    public search(): void {
        this._search.next();
    }

    public connect(): Observable<Array<T> | ReadonlyArray<T>> {
        return this._data.asObservable();
    }

    public disconnect(): void {
        // make sure that all streams and subscriptions are canceled/complete
        this._subscription.unsubscribe();
        this._search.complete();
        this._data.complete();
    }

    private _updateSubscription(): void {
        const search$: Observable<void> = merge(
            this._filter ? this._filter.search$ : EMPTY,
            this._search.asObservable()
        );
        const pageChange$: Observable<PageEvent | never> = this._paginator ? this._paginator.page : EMPTY;
        const sortChange$: Observable<Sort | never> = this._sort ? this._sort.sortChange : EMPTY;

        // watch for changes to the page or sort parameters
        const pageOrSortChange$: Observable<PageEvent | Sort | never> = merge(pageChange$, sortChange$).pipe(
            filter(() => this.data && this.data.length > 0), // accept page and/or sort events only if we already have data
            debounceTime(500) // debounce to reduce amount of (canceled) requests
        );

        // watch for any change that should result in fetching data from the server.
        // Either manual search event or page and/or sort event.
        const anyChange$: Observable<void | PageEvent | Sort> = merge(search$, pageOrSortChange$);

        const data$: Observable<Array<T>> = anyChange$.pipe(
            map(() => createRequestParams(this._filter, this._paginator, this._sort)),
            switchMap((params: RequestParameterInterface) => this.request(params)),
            map((response: Array<T> | TerraPagerInterface<T>) => {
                if (isPaginated(response)) {
                    if (this._paginator) {
                        this._paginator.length = response.totalsCount;
                    }
                    // TODO: we may be able to customize this with a method that extracts the data from the paginated response.
                    //  similar to the tree control/data source
                    return response.entries;
                }
                return response;
            })
        );
        this._subscription.unsubscribe();
        this._subscription = data$.subscribe((data: Array<T>) => this._data.next(data));
    }
}
