import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LoadingInterceptor } from './loading.interceptor';
import {
    LocaleService,
    TranslationService
} from 'angular-l10n';
import { AlertService } from '../components/alert/alert.service';
import { TerraLoadingSpinnerService } from '../components/loading-spinner/service/terra-loading-spinner.service';

export { AuthInterceptor } from './auth.interceptor';
export { ErrorInterceptor } from './error.interceptor';
export { LoadingInterceptor } from './loading.interceptor';

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
        multi:    true,
        deps:     [AlertService, TranslationService, LocaleService]
    },
    {
        provide:  HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi:    true,
        deps:     [TerraLoadingSpinnerService]
    }
];
