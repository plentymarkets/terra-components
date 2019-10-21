import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

/**
 * @description List of providers for all http interceptors
 */
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
