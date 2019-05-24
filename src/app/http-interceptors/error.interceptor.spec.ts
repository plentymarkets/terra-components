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
import Spy = jasmine.Spy;
import { TranslationService } from 'angular-l10n';

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

    it(`should catch error status 403 - Unauthorized`, () =>
    {
        const errorMsg:string = 'Unauthorized';
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

    it(`should catch error status 401 - Unauthenticated`, () =>
    {
        pending();
    });

    it(`should log errors to the console in dev mode and if a support user is logged in`, () =>
    {
        pending();
    });

    it(`should pass on error response to be handled by the developer himself`, () =>
    {
        pending();
    });

    it(`should not touch response if request is successful - status 2XX`, () =>
    {
        pending();
    });
});
