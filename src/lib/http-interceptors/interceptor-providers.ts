import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LoadingInterceptor } from './loading.interceptor';
import { LocaleService, TranslationService } from 'angular-l10n';
import { AlertService } from '../components/alert/alert.service';
import { TerraLoadingSpinnerService } from '../components/loading-spinner/service/terra-loading-spinner.service';

/**
 * @description List of providers for all http interceptors
 */
export const httpInterceptorProviders: Array<Provider> = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
    deps: [AlertService, TranslationService, LocaleService]
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
    deps: [TerraLoadingSpinnerService]
  }
];
