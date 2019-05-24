import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
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
        return undefined;
    }
}
