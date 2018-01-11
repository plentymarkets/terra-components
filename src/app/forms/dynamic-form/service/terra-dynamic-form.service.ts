import { Injectable } from '@angular/core';
import { TerraBaseService } from '../../../service/terra-base.service';
import { TerraLoadingSpinnerService } from '../../../loading-spinner/service/terra-loading-spinner.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * @author mfrank
 */
@Injectable()
export class TerraDynamicFormService extends TerraBaseService
{
    constructor(private _spinnerService:TerraLoadingSpinnerService,
                private _http:Http)
    {
        super(_spinnerService, _http, '', false);
    }

    /**
     * @param data
     * @param url
     * @return {any}
     */
    create(data:any, url:string, params:any):Observable<any>
    {
        this.setAuthorization();

        return this.mapRequest(
            this.http.post(url,
                {
                    headers: this.headers,
                    body:    data,
                    search:  this.createUrlSearchParams(params)
                })
        );

        //return Observable.of(data);
    }

    /**
     * @param data
     * @param url
     * @return {any}
     */
    update(data:any, url:string, params:any):Observable<any>
    {
        return this.mapRequest(
            this.http.put(url,
                {
                    headers: this.headers,
                    body:    data,
                    search:  this.createUrlSearchParams(params)
                })
        );

        //return Observable.of(data);
    }

    /**
     * @param data
     * @param url
     * @return {any}
     */
    delete(data:any, url:string):Observable<any>
    {
        return Observable.of(true);
    }
}