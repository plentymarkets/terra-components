import { Injectable } from '@angular/core';
import {
    Http,
    Headers,
    Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { TerraLoadingBarService } from '../loading-bar/service/terra-loading-bar.service';

/**
 * @author mfrank
 */
@Injectable()
export class TerraBaseService
{
    private _headers:Headers;
    private _url:string;
    
    constructor(private _baseLoadingBarService:TerraLoadingBarService,
                private _baseHttp:Http,
                private _baseUrl:string)
    {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.setAuthorization();
        this.url = _baseUrl;
    }
    
    get http():Http
    {
        return this._baseHttp;
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
        this._baseLoadingBarService.start();
        
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
                          this._baseLoadingBarService.complete();
                      },
                      error =>
                      {
                          this._baseLoadingBarService.complete()
                      });
        
        return req;
    }
}
