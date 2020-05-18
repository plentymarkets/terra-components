import {
    Observable,
    Subject
} from 'rxjs';

export class TerraFilter<T>
{
    public filterParameter:T = {} as T;

    public search$:Observable<void>;

    private _search$:Subject<void> = new Subject();

    constructor()
    {
        this.search$ = this._search$.asObservable();
    }

    public search():void
    {
        this._search$.next();
    }
}
