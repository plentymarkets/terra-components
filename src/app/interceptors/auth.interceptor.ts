import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @description HttpInterceptor that adds authorization to any request's header.
 *
 * @note for Plugin developers:
 *  To authorize yourself to the plentymarkets backend while development you need to store your accessToken in the localStorage using
 *  `localStorage.setItem('accessToken', <YourAccessToken>)`. This should be done before sending the first request - ideally during the boot of
 *  your application.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    public intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
    {
        // Get the token from local storage.
        const accessToken:string = localStorage.getItem('accessToken');

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq:HttpRequest<any> = req.clone({setHeaders: {Authorization: 'Bearer ' + accessToken}});

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}
