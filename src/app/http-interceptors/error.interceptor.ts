import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../components/alert/alert.service';
import { TranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core';
import { DispatchHelper } from '../helpers/dispatch.helper';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    constructor(private alertService:AlertService, private translation:TranslationService)
    {}

    public intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(
            catchError((error:HttpErrorResponse) =>
            {
                if(process.env.ENV === 'production')
                {
                    console.error('status = '+error.status+ '\n' +
                                'error = '+error.error);
                }

                // http status 401 Unauthorized
                if(error.status === 401)
                {
                    this.alertService.error(this.translation.translate('errorInterceptor.unauthorized'));
                }

                // http status 403 Forbidden / Unauthenticated
                if(error.status === 403)
                {
                    this.alertService.error(this.translation.translate('errorInterceptor.forbidden'));

                    if((<any>error).class)
                    {
                        let routeToLoginEvent:CustomEvent = new CustomEvent('CustomEvent');

                        routeToLoginEvent.initCustomEvent('routeToLogin', true, true, {});

                        DispatchHelper.dispatchEvent(routeToLoginEvent);
                    }
                }

                return Observable.throw(error);
            })
        );
    }
}
