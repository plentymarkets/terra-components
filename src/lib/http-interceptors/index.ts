import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

export { AuthInterceptor } from './auth.interceptor';
export { ErrorInterceptor } from './error.interceptor';
export { LoadingInterceptor } from './loading.interceptor';

export const httpInterceptorProviders:Array<Provider> = [
    {
        provide:  HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi:    true
    },
    {
        provide:  HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi:    true
    },
    {
        provide:  HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi:    true
    }
];
