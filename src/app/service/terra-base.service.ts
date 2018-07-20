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
    isArray,
    isNull,
    isNullOrUndefined
} from 'util';
import { TerraAlertComponent } from '../components/alert/terra-alert.component';
import { TerraLoadingSpinnerService } from '../components/loading-spinner/service/terra-loading-spinner.service';
import { TerraBaseParameterInterface } from '../components/data/terra-base-parameter.interface';
import { TerraQueryEncoder } from './data/terra-query-encoder';

/**
 * @author mfrank
 */
@Injectable()
export class TerraBaseService
{
    public headers:Headers;
    public url:string;

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

    public get http():Http
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

        return request.map((response:Response) =>
        {
            if(response.status === 204)
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

            if(error.status === 403 && this.getErrorClass(error) === 'UIHashExpiredException')
            {
                let routeToLoginEvent:CustomEvent = new CustomEvent('CustomEvent');

                routeToLoginEvent.initCustomEvent('routeToLogin', true, true, {});

                this.dispatchEvent(routeToLoginEvent);
            }
            else if(error.status === 403) // unauthorized
            {
                let missingUserPermissionAlertMessage:string = this.getMissingUserPermissionAlertMessage(error);

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
            else if(error.status === 401) // unauthenticated
            {
                let loginEvent:CustomEvent = new CustomEvent('login');
                // Workaround for plugins in Angular (loaded via iFrame)
                this.dispatchEvent(loginEvent);
            }

            return Observable.throw(error);
        }).finally(() => this._terraLoadingSpinnerService.stop());
    }

    private dispatchEvent(eventToDispatch:Event | CustomEvent):void
    {
        if(!isNullOrUndefined(window.parent))
        {
            // workaround for plugins in GWT (loaded via iFrame)
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
     * @param {boolean} arrayAsArray - Defines if an array search param should interpret and parsed as an array or not. Default is false.
     * @returns {URLSearchParams}
     */
    protected createUrlSearchParams(params:TerraBaseParameterInterface, arrayAsArray:boolean = false):URLSearchParams
    {
        let searchParams:URLSearchParams = new URLSearchParams('', new TerraQueryEncoder());

        if(!isNullOrUndefined(params))
        {
            Object.keys(params).forEach((key:string) =>
            {
                if(!isNullOrUndefined(params[key]) && params[key] !== '')
                {
                    if(arrayAsArray && isArray(params[key]))
                    {
                        searchParams.appendAll(this.createArraySearchParams(key, params[key]));
                    }
                    else
                    {
                        searchParams.set(key, params[key]);
                    }
                }

            });
        }

        return searchParams;
    }

    private createArraySearchParams(key:string, params:Array<string>):URLSearchParams
    {
        let arraySearchParams:URLSearchParams = new URLSearchParams();

        params.forEach((param:string) =>
        {
            arraySearchParams.append(key + '[]', param);
        });

        return arraySearchParams;
    }

    private getMissingUserPermissionAlertMessage(error:any):string
    {
        let missingRights:string = '';
        let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');
        let isGerman:boolean = langInLocalStorage === 'de';


        if(isGerman)
        {
            missingRights = 'Fehlende Berechtigungen für: <br/> • ';
        }
        else
        {
            missingRights = 'Missing permissions for: <br/> • ';
        }

        let body:{} = JSON.parse(error['_body']);

        if(!isNullOrUndefined(body))
        {
            let errorFromBody:{} = body['error'];

            if(!isNullOrUndefined(errorFromBody))
            {
                let missingPermissions:{ [key:string]:{ [key:string]:string } } = errorFromBody['missing_permissions'];

                let permissionTranslations:Array<{ [key:string]:string }> = [];

                Object.keys(missingPermissions).forEach((key:string) =>
                {
                    if(missingPermissions.hasOwnProperty(key))
                    {
                        permissionTranslations.push(missingPermissions[key]);
                    }
                });

                let english:Array<string> = [];
                let german:Array<string> = [];

                permissionTranslations.forEach((translations:{ [key:string]:string }) =>
                {
                    Object.keys(translations).forEach((key:string) =>
                    {
                        switch(key)
                        {
                            case 'de':
                                german.push(translations[key]);
                                break;
                            case 'en':
                                english.push(translations[key]);
                                break;
                        }
                    });
                });

                let concatedPermissions:string;

                if(isGerman)
                {
                    concatedPermissions = german.reverse().join('<br/> • ');
                }
                else
                {
                    concatedPermissions = english.reverse().join('<br/> • ');
                }

                missingRights += concatedPermissions;
            }
        }


        return missingRights;
    }
}
