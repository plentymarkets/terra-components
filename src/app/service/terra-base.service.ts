import { Injectable } from '@angular/core';
import {
    Headers,
    Http,
    Response,
    URLSearchParams
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Exception } from './data/exception.interface';
import {
    isNull,
    isNullOrUndefined
} from 'util';
import {
    TerraAlertComponent,
    TerraBaseParameterInterface,
    TerraLoadingSpinnerService,
    TerraPagerParameterInterface
} from '../../';

/**
 * @author mfrank
 */
@Injectable()
export class TerraBaseService
{
    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    public headers:Headers;
    public url:string;

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

    protected mapRequest(request:Observable<any>, err?:(error:any) => void, isRaw?:boolean):Observable<any>
    {
        this._terraLoadingSpinnerService.start();

        let req = request.map((response:Response) =>
        {
            if(response.status == 204)
            {
                return response.text();
            }
            else if(isRaw)
            {
                return response;
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

            if(error.status === 403 && this.getErrorClass(error) === 'UIHashExpiredException')
            {
                let routeToLoginEvent = new CustomEvent('CustomEvent');

                routeToLoginEvent.initCustomEvent('routeToLogin', true, true, {});

                this.dispatchEvent(routeToLoginEvent);
            }
            else if(error.status == 401 && errorMessage === "This action is unauthorized.")
            {
                if(this._isPlugin)
                {
                    this._alert.addAlertForPlugin({
                        msg:              missingUserPermissionAlertMessage,
                        type:             'danger',
                        dismissOnTimeout: 0
                    });
                }
                else
                {
                    this._alert.addAlert({
                        msg:              missingUserPermissionAlertMessage,
                        type:             'danger',
                        dismissOnTimeout: 0
                    });
                }
            }
            // END Very unclean workaround!
            else if(error.status == 401)
            {
                let loginEvent:CustomEvent = new CustomEvent('login');
                //Workaround for plugins in Angular (loaded via iFrame)
                this.dispatchEvent(loginEvent);
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

    private dispatchEvent(eventToDispatch:Event | CustomEvent):void
    {
        if(!isNullOrUndefined(window.parent))
        {
            //workaround for plugins in GWT (loaded via iFrame)
            if(!isNullOrUndefined(window.parent.window.parent))
            {
                window.parent.window.parent.window.dispatchEvent(eventToDispatch);
            }
            else
            {
                window.parent.window.dispatchEvent(eventToDispatch);
            }
        }
        else
        {
            window.dispatchEvent(eventToDispatch);
        }
    }

    private getErrorMessage(error:any):string
    {
        try
        {
            let errorMessage:string;

            if(!isNullOrUndefined(error.json().error))
            {
                errorMessage = error.json().error.message;
            }

            return errorMessage;
        }
        catch(e)
        {
            return null;
        }
    }

    private getErrorClass(error:any):string
    {
        try
        {
            let errorClass:string = error.json().class;
            return errorClass;
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
                    type:             'danger',
                    dismissOnTimeout: 0
                });
            }
            else
            {
                this._alert.addAlert({
                    msg:              this.getErrorString() + ': ' + response.message,
                    type:             'danger',
                    dismissOnTimeout: 0
                });
            }
        }
        // return if error code is null
        else if(isNullOrUndefined(response.error) || isNull(response.error.code))
        {
            return;
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
                    type:             'danger',
                    dismissOnTimeout: 0
                });
            }
            else
            {
                this._alert.addAlert({
                    msg:              this.getErrorString() + errorCode + ': ' + error.message,
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
