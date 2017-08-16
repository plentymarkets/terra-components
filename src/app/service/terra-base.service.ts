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
import { TerraAlertComponent } from '../alert/terra-alert.component';

/**
 * @author mfrank
 */
@Injectable()
export class TerraBaseService
{
    private _headers:Headers;
    private _url:string;
    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(private _terraLoadingSpinnerService:TerraLoadingSpinnerService,
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

    protected setToHeader(key:string, value:string):void
    {
        this.headers.set(key,
                         value);
    }

    protected deleteFromHeader(key:string):void
    {
        this.headers.delete(key);
    }

    protected setAuthorization():void
    {
        if(localStorage.getItem('accessToken'))
        {
            this.setToHeader('Authorization',
                             'Bearer ' + localStorage.getItem('accessToken'));
        }
    }

    protected mapRequest(request:Observable<Response>):Observable<any>
    {
        this._terraLoadingSpinnerService.start();

        let req = request.map(
            (response:Response) =>
            {
                if(response.status == 204)
                {
                    return response.text();
                }
                else
                {
                    return response.text() === '' ? {} : response.json();
                }
            }).catch(
            (error:any) =>
            {
                // START Very unclean workaround! Normally we should get a 403 status code as response
                // when user has no permission
                let errorMessage:string = error.json().error.message;
                let missingUserPermissionAlertMessage:string = this.getMissingUserPermissionAlertMessage();

                if(error.status == 401 && errorMessage === "This action is unauthorized.")
                {
                    this._alert
                        .addAlert({
                                      msg:              missingUserPermissionAlertMessage,
                                      closable:         true,
                                      type:             'danger',
                                      dismissOnTimeout: 0
                                  });
                }
                // END Very unclean workaround!
                else if(error.status == 401)
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
                      searchParams.set(key,
                                       params[key]);
                  });

        return searchParams;
    }

    private getMissingUserPermissionAlertMessage()
    {
        //START workaround because we do not have a real translation solution in terra components
        let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');
        if(langInLocalStorage === "de")
        {
            return "Fehlende Berechtigungen";
        }
        else
        {
            return "Missing permissions";
        }
        //END workaround
    }
}
