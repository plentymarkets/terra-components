import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from '../components/alert/alert.service';
import { TranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    constructor(private alertService:AlertService, private translation:TranslationService)
    {}

    public intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(
            tap((response:HttpResponse<any>) =>
            {
                if(response instanceof HttpErrorResponse)
                {
                    if(response.status === 403)
                    {
                        this.alertService.error(this.translation.translate('Unauthorized'));
                    }
                }
            })
        );
    }
}
