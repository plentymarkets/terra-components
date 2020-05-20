import {
    Observable,
    Subject
} from 'rxjs';

/**
 * Stores the filter parameters and notifies the data source to perform a search.
 * @experimental
 */
export class TerraFilter<T>
{
    /**
     * @description The filter parameter
     */
    public filterParameter:T = {} as T;

    /**
     * @description The search callback
     */
    public search$:Observable<void>;

    private _search$:Subject<void> = new Subject();

    constructor()
    {
        this.search$ = this._search$.asObservable();
    }

    /**
     * @description Called to emit the next filter search
     */
    public search():void
    {
        this._search$.next();
    }
}
