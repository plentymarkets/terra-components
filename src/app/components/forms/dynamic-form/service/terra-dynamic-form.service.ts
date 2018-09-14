import { Injectable } from '@angular/core';
import { TerraBaseService } from '../../../../service/terra-base.service';
import { TerraLoadingSpinnerService } from '../../../loading-spinner/service/terra-loading-spinner.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * @author mfrank
 */
@Injectable()
export class TerraDynamicFormService extends TerraBaseService
{
    constructor(private spinnerService:TerraLoadingSpinnerService,
                http:Http)
    {
        super(spinnerService, http, '', false);
    }

    /**
     * @param data
     * @param url
     * @return {any}
     */
    public create(data:any, url:string, params:any):Observable<any>
    {
        return Observable.of(data);
    }

    /**
     * @param data
     * @param url
     * @return {any}
     */
    public update(data:any, url:string, params:any):Observable<any>
    {
        return Observable.of(data);
    }

    /**
     * @param data
     * @param url
     * @return {any}
     */
    public delete(data:any, url:string):Observable<any>
    {
        return Observable.of(true);
    }
}
