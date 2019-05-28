import { ErrorInterceptor } from './error.interceptor';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpErrorResponse
} from '@angular/common/http';
import { Data } from '@angular/router';
import { AlertService } from '../components/alert/alert.service';
import { MockTranslationModule } from '../testing/mock-translation-module';
import { TranslationService } from 'angular-l10n';
import Spy = jasmine.Spy;

describe('ErrorInterceptor', () =>
{
    let httpClient:HttpClient;
    let httpTestingController:HttpTestingController;
    let alertService:AlertService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports:   [HttpClientTestingModule, MockTranslationModule],
            providers: [{
                provide:  HTTP_INTERCEPTORS,
                useClass: ErrorInterceptor,
                multi:    true
            }, AlertService]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        alertService = TestBed.get(AlertService);
    });

    it('should create an instance', () =>
    {
        let translationService:TranslationService = TestBed.get(TranslationService);
        expect(new ErrorInterceptor(alertService, translationService)).toBeTruthy();
    });

    it(`should catch error status 401 - Unauthorized`, () =>
    {
        const errorMsg:string = 'Unauthorized';
        const url:string = '';
        let spyAlert:Spy = spyOn(alertService, 'error');
        let spyDispatch:Spy = spyOn(window.parent, 'dispatchEvent')

        httpClient.get<Data>(url).subscribe(
            () => fail('should have failed with the 401 error'),
            (error:HttpErrorResponse) =>
            {
                let routeToLoginEvent:CustomEvent = new CustomEvent('routeToLogin');

                expect(error.status).toEqual(401);
                expect(error.error).toEqual(errorMsg);
                expect(spyAlert).toHaveBeenCalled();
                expect(spyDispatch).toHaveBeenCalledWith(routeToLoginEvent);
            }
        );

        const request:TestRequest = httpTestingController.expectOne(url);
        request.flush(errorMsg, {status: 401, statusText: 'Error'});
    });

    it(`should catch error status 403 - Forbidden`, () =>
    {
        const errorMsg:string = 'Forbidden';
        const url:string = '';
        let spy:Spy = spyOn(alertService, 'error');

        httpClient.get<Data>(url).subscribe(
            () => fail('should have failed with the 403 error'),
            (error:HttpErrorResponse) =>
            {
                expect(error.status).toEqual(403);
                expect(error.error).toEqual(errorMsg);
                expect(spy).toHaveBeenCalled();
            }
        );

        const request:TestRequest = httpTestingController.expectOne(url);
        request.flush(errorMsg, {status: 403, statusText: 'Error'});
    });


    it(`should log errors to the console in dev mode`, () =>
    {
        const errorMsg:string = 'Unauthenticated';
        const url:string = '';

        let spy:Spy = spyOn(console, 'error');

        httpClient.get<Data>(url).subscribe(
            () => fail('should have failed with the 403 error'),
            (error:HttpErrorResponse) =>
            {
                expect(error.status).toEqual(403);
                expect(error.error).toEqual(errorMsg);
                expect(spy).toHaveBeenCalledWith('status = ' + 403, 'error = ' + errorMsg);
            }
        );

        const request:TestRequest = httpTestingController.expectOne(url);
        request.flush(errorMsg, {status: 403, statusText: 'Error'});
    });

    it(`should log errors to the console if a support user is logged in`, () =>
    {
        pending();
    });

    it(`should pass on error response to be handled by the developer himself`, () =>
    {
        const errorMsg:string = 'Internal Server Error';
        const url:string = '';

        httpClient.get<Data>(url).subscribe(
            () => fail('should have failed with the 500 error'),
            (error:HttpErrorResponse) =>
            {
                expect(error.status).toEqual(500);
                expect(error.error).toEqual(errorMsg);
            }
        );

        const request:TestRequest = httpTestingController.expectOne(url);
        request.flush(errorMsg, {status: 500, statusText: 'Error'});
    });

    it(`should not touch response if request is successful - status 2XX`, () =>
    {
        const url:string = '';

        httpClient.get<Data>(url).subscribe(
            (response:Response) =>
            {
                expect(response).toEqual('testContent');
            },
            () => fail('should not failed with the 200 status code')
        );

        const request:TestRequest = httpTestingController.expectOne(url);
        request.flush('testContent', {status: 200, statusText: 'success'});
    });

    afterEach(() =>
    {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });
});
