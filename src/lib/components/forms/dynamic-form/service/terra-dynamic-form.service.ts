/* eslint-disable */
// Adding disable only because of the experimental state of the service!
import { Injectable } from '@angular/core';
import { TerraBaseService } from '../../../../service/terra-base.service';
import { TerraLoadingSpinnerService } from '../../../loading-spinner/service/terra-loading-spinner.service';
import { Http } from '@angular/http';
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
export class TerraDynamicFormService extends TerraBaseService
{
    constructor(private spinnerService:TerraLoadingSpinnerService,
                private baseHttp:Http)
    {
        super(spinnerService, baseHttp, '', false);
    }

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
