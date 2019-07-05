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
import {
    LocaleService,
    TranslationService
} from 'angular-l10n';
import { Injectable } from '@angular/core';
import { DispatchHelper } from '../helpers/dispatch.helper';

/**
 * @description HttpInterceptor that handles some specific errors that may occur when requesting data from a plentymarkets system. It also logs
 *     errors to the console when serving in development mode.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    constructor(private alertService:AlertService, private translation:TranslationService, private locale:LocaleService)
    {}

    public intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(
            catchError((error:HttpErrorResponse) =>
            {
                if(process.env.ENV === 'development')
                {
                    console.error(error);
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
                    const missingPermissionsKey:string = 'missing_permissions';
                    if(error.error && error.error['error'] && error.error['error'][missingPermissionsKey])
                    {
                        let errorMessage:string = this.translation.translate('errorInterceptor.missingPermissions');
                        let missingPermissions:{ [key:string]:{ [lang:string]:string } } = error.error['error'][missingPermissionsKey];
                        let translations:Array<string> = this.getMissingPermissionTranslations(missingPermissions, this.locale.getCurrentLanguage());
                        const separator:string = '<br/> • ';
                        errorMessage += separator + translations.reverse().join('<br/> • ');
                        this.alertService.error(this.translation.translate(errorMessage));
                    }
                    else
                    {
                        this.alertService.error(this.translation.translate('errorInterceptor.forbidden'));
                    }

                }

                // re-throw the error so that developers are able handle it in their UIs as well
                return Observable.throw(error);
            })
        );
    }

    private getMissingPermissionTranslations(missingPermissions:{ [key:string]:{ [lang:string]:string } }, lang:string = 'en'):Array<string>
    {
        return Object.values(missingPermissions).map((missingPermission:{ lang:string }) => missingPermission[lang]);
    }
}
