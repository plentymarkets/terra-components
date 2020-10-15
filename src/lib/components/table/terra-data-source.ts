import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, EMPTY, merge, Observable, Subject, Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { createRequestParams, isPaginated } from './util';
import { RequestParameterInterface } from './request-parameter.interface';
import { TerraFilter } from './filter';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';

/**
 * A custom implementation of angular cdk's data source that
 * simplifies connection to a plentymarkets rest api.
 * Can be used with any combination of paging, sorting and filtering functionality.
 * To enable paging, sorting and/or filtering just pass the respective class/component to this data source.
 *
 * @example
 * ```typescript
 * class MyDataSource extends TerraDataSource<MyData>
 * {
 *     constructor(private service:MyDataService) {}
 *
 *     public request():Observable<Array<MyData> | TerraPagerInterface<MyData>> {
 *         return this.service.getData();
 *     }
 * }
 *
 * @Component({
 *     template: '...<table mat-table [dataSource]="dataSource">...'
 * })
 * class MyComponent implements OnInit, AfterViewInit
 * {
 *     public dataSource:MyDataSource = new MyDataSource(this.service);
 *     public filter:TerraFilter<any> = new TerraFilter();
 *     @ViewChild(MatPaginator, {static: true})
 *     public paginator:MatPaginator;
 *     @ViewChild(MatSort, {static: true})
 *     public sort:MatSort;
 *
 *     constructor(private service:MyDataService) {}
 *
 *     ngOnInit() {
 *         this.dataSource = this.sort;
 *         this.dataSource = this.paginator;
 *         this.dataSource = this.filter;
 *     }
 *
 *     ngAfterViewInit() {
 *         this.dataSource.search(); // triggers an initial search
 *     }
 * }
 * ```
 */
export abstract class TerraDataSource<T> extends DataSource<T> {
    /** Snapshot of the currently displayed data. */
    public get data(): Array<T> {
        return this._data.value;
    }
    public set data(data: Array<T>) {
        this._data.next(data);
    }
    private _data: BehaviorSubject<Array<T>> = new BehaviorSubject([]);

    /** Instance of the TerraFilter class used to narrow results. */
    public get filter(): TerraFilter<Object> {
        return this._filter;
    }
    public set filter(f: TerraFilter<Object>) {
        this._filter = f;
        this._updateSubscription();
    }
    private _filter: TerraFilter<Object> | undefined;

    /**
     * Instance of the MatSort directive used by the table to control its sorting.
     * Sort changes emitted by the MatSort will trigger an update to the table's rendered data.
     */
    public get sort(): MatSort {
        return this._sort;
    }
    public set sort(s: MatSort) {
        this._sort = s;
        this._updateSubscription();
    }
    private _sort: MatSort | undefined;

    /**
     * Instance of the MatPaginator component used by the table to control what page and
     * how many items of the data are displayed.
     * Page changes emitted by the MatPaginator will trigger an update to the table's rendered data.
     */
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

    /** Initiates a request that fetches data from the server */
    public search(): void {
        this._search.next();
    }

    /** Called by the table when it connects to this data source */
    public connect(): Observable<Array<T> | ReadonlyArray<T>> {
        return this._data.asObservable();
    }

    /** Called by the table then it is destroyed. Cleans up streams and subscriptions */
    public disconnect(): void {
        // make sure that all streams and subscriptions are canceled/complete
        this._subscription.unsubscribe();
        this._search.complete();
        this._data.complete();
    }

    /**
     * Subscribe to changes that should trigger an update to the table's rendered data. When the
     * changes occur, process the current state of the filter, sort, and pagination and fetch the requested
     * data from the server using the provided implementation of the `request` method.
     *
     * Sorting and pagination is only watched if MatSort and/or MatPaginator are provided.
     */
    private _updateSubscription(): void {
        // check if sorting and/or pagination is enabled. If not, provide an EMPTY stream instead.
        const pageChange$: Observable<PageEvent | never> = this._paginator ? this._paginator.page : EMPTY;
        const sortChange$: Observable<Sort | never> = this._sort ? this._sort.sortChange : EMPTY;

        // watch for changes to the page or sort parameters
        const pageOrSortChange$: Observable<PageEvent | Sort | never> = merge(pageChange$, sortChange$).pipe(
            filter(() => this.data && this.data.length > 0), // accept page and/or sort events only if we already have data
            debounceTime(500) // debounce to reduce amount of (canceled) requests
        );

        // A manual search can be triggered via the filter or this data source directly
        const search$: Observable<void> = merge(
            this._filter ? this._filter.search$ : EMPTY,
            this._search.asObservable()
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
