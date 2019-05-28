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
                if(process.env.ENV === 'development')
                {
                    console.error('status = ' + error.status, 'error = ' + error.error);
                }

                // http status 401 Unauthorized
                if(error.status === 401)
                {
                    this.alertService.error(this.translation.translate('errorInterceptor.unauthorized'));

                    DispatchHelper.dispatchEvent(new CustomEvent('routeToLogin'));
                }

                // http status 403 Forbidden
                if(error.status === 403)
                {
                    let errorMessage:string = this.translation.translate('errorInterceptor.forbidden');

                    let missingPermissions:{ [key:string]:{ [key:string]:string } } = error['missing_permissions'];

                    let permissionTranslations:Array<{ [key:string]:string }> = [];

                    Object.keys(missingPermissions).forEach((key:string) =>
                    {
                        if(missingPermissions.hasOwnProperty(key))
                        {
                            permissionTranslations.push(missingPermissions[key]);
                        }
                    });

                    let errorCollection:Array<string> = [];

                    permissionTranslations.forEach((translations:{ [key:string]:string }) =>
                    {
                        Object.keys(translations).forEach((key:string) =>
                        {
                            errorCollection.push(translations[key]);
                        });
                    });

                    errorMessage += errorCollection.reverse().join('<br/> • ');

                    this.alertService.error(this.translation.translate(errorMessage));
                }

                return Observable.throw(error);
            })
        );
    }
}
