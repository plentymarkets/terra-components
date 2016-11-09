import { Injectable } from '@angular/core';
import {
    Http,
    Headers,
    Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { PlentyLoadingBarService } from '../loading-bar/service/plenty-loading-bar.service';

/**
 * @author mfrank
 */
@Injectable()
export class BaseService
{
    private _headers:Headers;
    private _url:string;
    
    constructor(private _loadingBarService:PlentyLoadingBarService,
                private _http:Http,
                url:string)
    {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.setAuthorization();
        this.url = url;
    }
    
    get http():Http
    {
        return this._http;
    }
    
    get headers():Headers
    {
        return this._headers;
    }
    
    set headers(value:Headers)
    {
        this._headers = value;
    }
    
    get url():string
    {
        return this._url;
    }
    
    set url(value:string)
    {
        this._url = value;
    }
    
    protected setToHeader(key:string,
                          value:string):void
    {
        this.headers.set(key, value);
    }
    
    protected deleteFromHeader(key:string):void
    {
        this.headers.delete(key);
    }
    
    protected setAuthorization():void
    {
        if(localStorage.getItem('accessToken'))
        {
            this.setToHeader('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }
    }
    
    protected mapRequest(request:Observable<Response>):Observable<any>
    {
        this._loadingBarService.start();
        
        let req = request.map(
            (response:Response) =>
            {
                if(response.status == 204)
                {
                    return response.text();
                }
                else
                {
                    return response.json()
                }
            }).share();
        
        req.subscribe(() =>
                      {
                          this._loadingBarService.complete();
                      },
                      error =>
                      {
                          this._loadingBarService.complete()
                      });
        
        return req;
    }
}
