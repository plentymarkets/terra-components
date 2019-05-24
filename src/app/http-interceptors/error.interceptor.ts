import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class ErrorInterceptor implements HttpInterceptor
{
    public intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
    {
        return undefined;
    }
}
