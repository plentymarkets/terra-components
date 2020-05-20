import {
    Observable,
    Subject
} from 'rxjs';

/**
 *
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
