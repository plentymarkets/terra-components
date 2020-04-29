import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TerraLoadingSpinnerService } from '../components/loading-spinner/service/terra-loading-spinner.service';
import { Data } from '@angular/router';
import { LoadingInterceptor } from './loading.interceptor';
import { finalize } from 'rxjs/operators';
import Spy = jasmine.Spy;

describe('LoadingInterceptor:', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let loadingSpinner: TerraLoadingSpinnerService;

    const url: string = '';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TerraLoadingSpinnerService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LoadingInterceptor,
                    multi: true
                }
            ]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        loadingSpinner = TestBed.get(TerraLoadingSpinnerService);
        spyOn(loadingSpinner, 'start');
        spyOn(loadingSpinner, 'stop');
    });

    it(`should create`, () => {
        const interceptors: Array<HttpInterceptor> = TestBed.get(HTTP_INTERCEPTORS);
        expect(
            interceptors.find((interceptor: HttpInterceptor) => interceptor instanceof LoadingInterceptor)
        ).toBeTruthy();
    });

    it(`should start the loading spinner when a request is started`, () => {
        const data: Data = {};

        httpClient.get(url).subscribe();
        expect(loadingSpinner.start).toHaveBeenCalledTimes(1);
        let request: TestRequest = httpTestingController.expectOne(url);
        request.flush(data);
    });

    // TODO: This is not testable atm.. finalize before the finalize operator in the interceptor.. check if this may be fixed in Angular 7
    // see https://remypenchenat.blogspot.com/2019/03/angular-7-rxjs-test-finalize.html
    xit(`should stop the loading spinner when a request is completed`, () => {
        const data: Data = {};

        httpClient
            .get(url)
            .pipe(finalize(() => expect(loadingSpinner.stop).toHaveBeenCalled()))
            .subscribe(
                () => expect(loadingSpinner.stop).not.toHaveBeenCalled(),
                () => fail('No error expected')
            );

        let request: TestRequest = httpTestingController.expectOne(url);
        request.flush(data);
    });

    // TODO: This is not testable atm.. finalize before the finalize operator in the interceptor.. check if this may be fixed in Angular 7
    xit(`should stop the loading spinner also when a request fails`, () => {
        const errMsg: string = 'Error';

        httpClient
            .get(url)
            .pipe(finalize(() => expect(loadingSpinner.stop).toHaveBeenCalled()))
            .subscribe(
                () => fail('Error expected'),
                (error: HttpErrorResponse) => expect(error.status).toBe(500)
            );

        let request: TestRequest = httpTestingController.expectOne(url);
        request.flush(errMsg, { status: 500, statusText: 'Internal Server error' });
    });

    // TODO: feature for later
    xit(`should fire #loadingStatus-Event when a request is started and when it is completed`, () => {
        const data: Data = {};
        let spy: Spy = jasmine.createSpy('loadingStatus');
        window.addEventListener('loadingStatus', spy);

        httpClient.get(url).subscribe(
            (responseData: Data) => expect(responseData).toBe(data),
            () => fail('No error expected'),
            () => {
                expect(spy).toHaveBeenCalledTimes(2);
                expect(spy).toHaveBeenCalledWith(new CustomEvent('loadingStatus', { detail: { isLoading: false } }));
            }
        );
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new CustomEvent('loadingStatus', { detail: { isLoading: true } }));

        let request: TestRequest = httpTestingController.expectOne(url);
        request.flush(data);
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
