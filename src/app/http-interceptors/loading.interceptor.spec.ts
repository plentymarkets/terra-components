import { LoadingInterceptor } from './loading.interceptor';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpInterceptor
} from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TerraLoadingSpinnerService } from '../components/loading-spinner/service/terra-loading-spinner.service';
import { Data } from '@angular/router';
import Spy = jasmine.Spy;

describe('LoadingInterceptor:', () =>
{
    let httpClient:HttpClient;
    let httpTestingController:HttpTestingController;
    let loadingSpinner:TerraLoadingSpinnerService;

    const url:string = '';

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports:   [HttpClientTestingModule],
            providers: [
                TerraLoadingSpinnerService,
                {
                    provide:  HTTP_INTERCEPTORS,
                    useClass: LoadingInterceptor,
                    multi:    true
                }
            ]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        loadingSpinner = TestBed.get(TerraLoadingSpinnerService);
    });

    it(`should create`, () =>
    {
        const interceptors:Array<HttpInterceptor> = TestBed.get(HTTP_INTERCEPTORS);
        expect(interceptors.find((interceptor:HttpInterceptor) => interceptor instanceof LoadingInterceptor)).toBeTruthy();
    });

    it(`should start the loading spinner when a request is started`, () =>
    {
        const data:Data = {};
        const spy:Spy = spyOn(loadingSpinner, 'start');

        httpClient.get(url).subscribe();
        expect(spy).toHaveBeenCalledTimes(1);
        let request:TestRequest = httpTestingController.expectOne(url);
        request.flush(data);
    });

    // TODO: This one fails.. I don't know why..
    it(`should stop the loading spinner when a request is completed`, () =>
    {
        const data:Data = {};
        const spy:Spy = spyOn(loadingSpinner, 'stop');

        httpClient.get(url).subscribe(
            () => expect(spy).not.toHaveBeenCalled(),
            () => fail('No error expected'),
            () => expect(spy).toHaveBeenCalled()
        );

        let request:TestRequest = httpTestingController.expectOne(url);
        request.flush(data);
    });

    it(`should stop the loading spinner also when a request fails`, () =>
    {
        const errMsg:string = 'Error';
        const spy:Spy = spyOn(loadingSpinner, 'stop');

        httpClient.get(url).subscribe(
            () => fail('Error expected'),
            () => expect(spy).not.toHaveBeenCalled(),
            () => expect(spy).toHaveBeenCalled()
        );

        let request:TestRequest = httpTestingController.expectOne(url);
        request.flush(errMsg, {status: 500, statusText: 'Internal Server error'});
    });

    // TODO: feature for later
    xit(`should fire #loadingStatus-Event when a request is started and when it is completed`, () =>
    {
        const data:Data = {};
        let spy:Spy = jasmine.createSpy('loadingStatus');
        window.addEventListener('loadingStatus', spy);

        httpClient.get(url).subscribe(
            (responseData:Data) => expect(responseData).toBe(data),
            () => fail('No error expected'),
            () =>
            {
                expect(spy).toHaveBeenCalledTimes(2);
                expect(spy).toHaveBeenCalledWith(new CustomEvent('loadingStatus', {detail: {isLoading: false}}));
            },
        );
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new CustomEvent('loadingStatus', {detail: {isLoading: true}}));

        let request:TestRequest = httpTestingController.expectOne(url);
        request.flush(data);
    });

    afterEach(() =>
    {
        httpTestingController.verify();
    });
});
