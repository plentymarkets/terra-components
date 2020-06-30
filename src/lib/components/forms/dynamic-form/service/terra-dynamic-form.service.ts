import { Injectable } from '@angular/core';
import {
    Observable,
    of
} from 'rxjs';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
@Injectable({
    providedIn: 'root'
})
export class TerraDynamicFormService
{
    /**
     * @param data
     * @param url
     * @param params
     */
    public create(data:any, url:string, params:any):Observable<any>
    {
        return of(data);
    }

    /**
     * @param data
     * @param url
     * @param params
     */
    public update(data:any, url:string, params:any):Observable<any>
    {
        return of(data);
    }

    /**
     * @param data
     * @param url
     */
    public delete(data:any, url:string):Observable<any>
    {
        return of(true);
    }
}
