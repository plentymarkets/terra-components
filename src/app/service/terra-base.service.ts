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
import { Exception } from './data/exception.interface';
import { isNullOrUndefined } from 'util';
import { TerraPagerParameterInterface } from '../pager/data/terra-pager.parameter.interface';

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
                private _baseUrl:string,
                private _isPlugin?:boolean)
    {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.setAuthorization();
        this.url = _baseUrl;

        if(isNullOrUndefined(this._isPlugin))
        {
            this._isPlugin = false;
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

    protected mapRequest(request:Observable<Response>, err?:(error:any) => void, isPdf?:boolean):Observable<any>
    {
        this._terraLoadingSpinnerService.start();

        let req = request.map((response:Response) =>
        {
            if(response.status == 204)
            {
                return response.text();
            }
            else if(!isNullOrUndefined(isPdf) && isPdf == true)
            {
                return response.text();
            }
            else
            {
                return response.text() === '' ? {} : response.json();
            }
        }).catch((error:any) =>
        {
            if(err)
            {
                err(error);
            }
            else
            {
                this.handleException(error);
            }

            // START Very unclean workaround! Normally we should get a 403 status code as response
            // when user has no permission
            let errorMessage:string = this.getErrorMessage(error);

            let missingUserPermissionAlertMessage:string = this.getMissingUserPermissionAlertMessage();

            if(error.status == 401 && errorMessage === "This action is unauthorized.")
            {
                if(this._isPlugin)
                {
                    this._alert.addAlertForPlugin({
                        msg:              missingUserPermissionAlertMessage,
                        closable:         true,
                        type:             'danger',
                        dismissOnTimeout: 0
                    });
                }
                else
                {
                    this._alert.addAlert({
                        msg:              missingUserPermissionAlertMessage,
                        closable:         true,
                        type:             'danger',
                        dismissOnTimeout: 0
                    });
                }
            }
            // END Very unclean workaround!
            else if(error.status == 401)
            {
                let event:CustomEvent = new CustomEvent('login');
                //Workaround for plugins in Angular (loaded via iFrame)
                if(window.parent !== null)
                {
                    //workaround for plugins in GWT (loaded via iFrame)
                    if(window.parent.window.parent !== null)
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

    private getErrorMessage(error:any):string
    {
        try
        {
            let errorMessage:string = error.json().error.message;
            return errorMessage;
        }
        catch(e)
        {
            return null;
        }
    }

    /**
     * Workaround to prevent the injection of the TranslationService in every Service, that extends TerraBaseService
     * @returns {string}
     */
    protected getErrorString():string
    {
        // get language from localStorage
        let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');

        // translate error string
        switch(langInLocalStorage)
        {
            case 'de':
                return 'Fehler';
            case 'en':
                return 'Error';
            default:
                return 'Error';
        }
    }

    /**
     * Handles exceptions that are returned from the server on a failed rest call
     * @param exception
     */
    private handleException(exception:any):void
    {
        // parse response object
        let response:any = JSON.parse(exception._body);

        // check which exception type has been received
        if(!isNullOrUndefined(response.error) && !isNullOrUndefined(response.message))
        {
            if(this._isPlugin)
            {
                this._alert.addAlertForPlugin({
                    msg:              this.getErrorString() + ': ' + response.message,
                    closable:         true,
                    type:             'danger',
                    dismissOnTimeout: 0
                });
            }
            else
            {
                this._alert.addAlert({
                    msg:              this.getErrorString() + ': ' + response.message,
                    closable:         true,
                    type:             'danger',
                    dismissOnTimeout: 0
                });
            }
        }
        // default exception type
        else
        {
            // parse exception string
            let error:Exception = response.error;

            // get error code
            let errorCode:string = error.code ? ' ' + error.code : '';

            if(this._isPlugin)
            {
                this._alert.addAlertForPlugin({
                    msg:              this.getErrorString() + errorCode + ': ' + error.message,
                    closable:         true,
                    type:             'danger',
                    dismissOnTimeout: 0
                });
            }
            else
            {
                this._alert.addAlert({
                    msg:              this.getErrorString() + errorCode + ': ' + error.message,
                    closable:         true,
                    type:             'danger',
                    dismissOnTimeout: 0
                });
            }
        }
    }

    /**
     * @param {TerraBaseParameterInterface} params
     * @returns {URLSearchParams}
     */
    protected createUrlSearchParams(params:TerraBaseParameterInterface):URLSearchParams
    {
        let searchParams:URLSearchParams = new URLSearchParams();

        Object.keys(params).map((key) =>
        {
            searchParams.set(key, params[key]);
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

    /**
     * Appends the given parameters to the given url
     *
     * @param {string} url
     * @param {TerraPagerParameterInterface} params
     * @returns {string}
     */
    protected addParamsToUrl(url:string, params:TerraPagerParameterInterface):string
    {
        // check if params are given
        if(isNullOrUndefined(params))
        {
            return url;
        }

        // initialize separator for parameters
        let separator:string = '?';

        // check if any parameter has already been appended
        if(url.split('/').pop().includes('?'))
        {
            separator = '&';
        }

        // add parameters to the url
        for(let obj in params)
        {
            // check if parameter is defined
            if(!isNullOrUndefined(obj))
            {
                // check if parameter's value is set
                if(!isNullOrUndefined(params[obj]))
                {
                    // append parameter to the url
                    url += separator + obj + '=' + params[obj];

                    // set separator for subsequent parameters
                    separator = '&';
                }
            }
        }

        return url;
    }
}
