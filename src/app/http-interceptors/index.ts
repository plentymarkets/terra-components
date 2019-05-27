import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';

export { AuthInterceptor } from './auth.interceptor';

export const httpInterceptorProviders:Array<Provider> = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
