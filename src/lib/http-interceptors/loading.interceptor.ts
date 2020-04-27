import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TerraLoadingSpinnerService } from '../components/loading-spinner/service/terra-loading-spinner.service';
import { finalize } from 'rxjs/operators';

/**
 * @description HttpInterceptor that triggers the loading spinner in terra. It starts and also stops it.
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _loadingSpinner: TerraLoadingSpinnerService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingSpinner.start();
    return next.handle(req).pipe(finalize(() => this._loadingSpinner.stop()));
  }
}
