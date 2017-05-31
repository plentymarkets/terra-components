import { Injectable } from '@angular/core';
import {
    Headers,
    Http,
    Response,
    URLSearchParams
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { TerraLoadingSpinnerService } from '../loading-spinner/service/terra-loading-spinner.service';
import { TerraBaseParameterInterface } from '../data/terra-base-parameter.interface';
import { TerraCacheInterface } from './data/terra-cache.interface';

/**
 * @author mfrank
 */
@Injectable()
export class TerraBaseService
{
    private _headers:Headers;
    private _url:string;
    private _cache:Array<TerraCacheInterface> = [];
    
    constructor(private _terraLoadingSpinnerService:TerraLoadingSpinnerService,
                private _baseHttp:Http,
                private _baseUrl:string)
    {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.setAuthorization();
        
        if(process.env.ENV === 'production')
        {
            this.url = _baseUrl;
        }
        else
        {
            this.url = "http://master.plentymarkets.com" + _baseUrl;
        }
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
    
    protected setToHeader(key:string, value:string):void
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
    
    protected getRequest(url:string, loadFromCache:boolean):Observable<any>
    {
        let result:any = null;
        
        this._cache
            .some((item:TerraCacheInterface) =>
                  {
                      if(item.url == url)
                      {
                          //respone is already loaded
                          result = item.content;
                
                          return true;
                      }
                  });
        
        if(result === null || loadFromCache === true)
        {
            return this.mapRequest(this.http
                                       .get(url, {
                                           headers: this.headers
                                       }));
        }
        else
        {
            Promise.resolve();
            
            return Observable.of(result);
        }
    }
    
    protected mapRequest(request:Observable<any>):Observable<any>
    {
        this._terraLoadingSpinnerService.start();
        
        let req = request.map(
            (response:Response) =>
            {
                if(response.status == 204)
                {
                    this._cache
                        .push({
                                  url:     response.url,
                                  content: response.text()
                              });
                }
                else
                {
                    if(response.text() === '')
                    {
                        this._cache
                            .push({
                                      url:     response.url,
                                      content: {}
                                  });
                    }
                    else
                    {
                        this._cache
                            .push({
                                      url:     response.url,
                                      content: response.json()
                                  });
                    }
                }
                
                return this._cache[this._cache.length - 1].content;
                
            }).catch(
            (error:any) =>
            {
                if(error.status == 401)
                {
                    let event:CustomEvent = new CustomEvent('login');
                    //Workaround for plugins in Angular (loaded via iFrame)
                    if(window.parent != null)
                    {
                        //workaround for plugins in GWT (loaded via iFrame)
                        if(window.parent.window.parent != null)
                        {
                            window.parent.window.parent.window.dispatchEvent(event);
                        }
                        else
                        {
                            window.parent.window.dispatchEvent(event);
                        }
                    }
                    else
                    {
                        window.dispatchEvent(event);
                    }
                }
                
                return Observable.throw(error);
            }).share();
        
        req.subscribe(() =>
                      {
                          this._terraLoadingSpinnerService.stop();
                      },
                      error =>
                      {
                          this._terraLoadingSpinnerService.stop();
                      }
        );
        
        return req;
    }
    
    /**
     * @param {TerraBaseParameterInterface} params
     * @returns {URLSearchParams}
     */
    protected createUrlSearchParams(params:TerraBaseParameterInterface):URLSearchParams
    {
        let searchParams:URLSearchParams = new URLSearchParams();
        
        Object.keys(params)
              .map(
                  (key) =>
                  {
                      searchParams.set(key, params[key]);
                  });
        
        return searchParams;
    }
}
