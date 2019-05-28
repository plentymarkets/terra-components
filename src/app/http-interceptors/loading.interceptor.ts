import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TerraLoadingSpinnerService } from '../components/loading-spinner/service/terra-loading-spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor
{
    constructor(private loadingSpinner:TerraLoadingSpinnerService)
    {}

    public intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
    {
        this.loadingSpinner.start();
        return next.handle(req);
    }
}
