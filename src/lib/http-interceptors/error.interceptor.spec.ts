import { ErrorInterceptor } from './error.interceptor';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';
import { AlertService } from '../components/alert/alert.service';
import { MockTranslationModule } from '../testing/mock-translation-module';
import { LocaleService, L10nTranslationService } from 'angular-l10n';
import Spy = jasmine.Spy;

const localeServiceStub: Partial<LocaleService> = {
    getCurrentLanguage: (): string => 'de'
};

describe('ErrorInterceptor', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let alertService: AlertService;

    const url: string = '';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MockTranslationModule],
            providers: [
                AlertService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true
                },
                {
                    provide: LocaleService,
                    useValue: localeServiceStub
                }
            ]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        alertService = TestBed.get(AlertService);
    });

    it('should create an instance', () => {
        const translationService: L10nTranslationService = TestBed.get(L10nTranslationService);
        const localeService: LocaleService = TestBed.get(LocaleService);
        expect(new ErrorInterceptor(alertService, translationService, localeService)).toBeTruthy();
    });

    it(`should show an alert and dispatch a 'routeToLogin' event when 401 - Unauthorized error is received`, () => {
        const errorMsg: string = 'Unauthorized';
        const status: number = 401;
        const spyAlert: Spy = spyOn(alertService, 'error');
        const spyDispatch: Spy = spyOn(window.parent, 'dispatchEvent');

        httpClient.get<Data>(url).subscribe(
            () => fail(`should have failed with the ${status} error`),
            (error: HttpErrorResponse) => {
                const routeToLoginEvent: CustomEvent = new CustomEvent('routeToLogin');

                expect(error.status).toEqual(status);
                expect(error.error).toEqual(errorMsg);
                expect(spyAlert).toHaveBeenCalled();
                expect(spyDispatch).toHaveBeenCalledWith(routeToLoginEvent);
            }
        );

        const request: TestRequest = httpTestingController.expectOne(url);
        request.flush(errorMsg, { status: status, statusText: 'Error' });
    });

    it(`should show an alert when 403 - Forbidden is received`, () => {
        const errorMsg: string = 'Forbidden';
        const status: number = 403;
        const spy: Spy = spyOn(alertService, 'error');
        const translationService: L10nTranslationService = TestBed.get(L10nTranslationService);

        httpClient.get<Data>(url).subscribe(
            () => fail(`should have failed with the ${status} error`),
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(status);
                expect(error.error).toEqual(errorMsg);
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(translationService.translate('errorInterceptor.forbidden'));
            }
        );

        const request: TestRequest = httpTestingController.expectOne(url);
        request.flush(errorMsg, { status: status, statusText: 'Error' });
    });

    it(`should show an alert with the missing permissions when 403 - Forbidden with missing permissions is received`, () => {
        const errorBody: {} = { error: { missing_permissions: { test: { de: 'test' } } } };
        const status: number = 403;
        const alertSpy: Spy = spyOn(alertService, 'error');
        const translationService: L10nTranslationService = TestBed.get(L10nTranslationService);
        const translationSpy: Spy = spyOn(translationService, 'translate');

        httpClient.get<Data>(url).subscribe(
            () => fail(`should have failed with the ${status} error`),
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(status);
                expect(error.error).toEqual(errorBody);
                expect(alertSpy).toHaveBeenCalled();
                expect(translationSpy).toHaveBeenCalledWith('errorInterceptor.missingPermissions');
            }
        );

        const request: TestRequest = httpTestingController.expectOne(url);
        request.flush(errorBody, { status: status, statusText: 'Error' });
    });

    // TODO: we are not able to test whether errors are logged in any other mode
    it(`should not log errors to the console in test mode`, () => {
        const errorMsg: string = 'Unauthenticated';
        const status: number = 403;

        const spy: Spy = spyOn(console, 'error');

        httpClient.get<Data>(url).subscribe(
            () => fail(`should have failed with the ${status} error`),
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(status);
                expect(error.error).toEqual(errorMsg);
                expect(spy).not.toHaveBeenCalled();
            }
        );

        const request: TestRequest = httpTestingController.expectOne(url);
        request.flush(errorMsg, { status: status, statusText: 'Error' });
    });

    it(`should pass on error response to be handled by the developer himself`, () => {
        const errorMsg: string = 'Internal Server Error';
        const status: number = 500;

        httpClient.get<Data>(url).subscribe(
            () => fail('should have failed with the 500 error'),
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(status);
                expect(error.error).toEqual(errorMsg);
            }
        );

        const request: TestRequest = httpTestingController.expectOne(url);
        request.flush(errorMsg, { status: status, statusText: 'Error' });
    });

    it(`should not touch response if request is successful - status 2XX`, () => {
        const testData: Data = {};

        httpClient.get<Data>(url).subscribe(
            (data: Data) => expect(data).toEqual(testData),
            () => fail('should not failed with the 200 status code')
        );

        const request: TestRequest = httpTestingController.expectOne(url);
        request.flush(testData, { status: 200, statusText: 'success' });
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });
});
