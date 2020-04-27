import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { Data } from '@angular/router';

describe(`AuthInterceptor:`, () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const url: string = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it(`should add Authorization to the headers of any request`, () => {
    const testData: Data = {};
    const accessToken: string = 'IAmAnAccessToken';
    localStorage.setItem('accessToken', accessToken);

    // Make an HTTP GET request
    httpClient.get<Data>(url).subscribe((data: Data) =>
      // When observable resolves, result should match test data
      expect(data).toBe(testData)
    );

    // Expect one request with a proper authorization header
    const request: TestRequest = httpTestingController.expectOne(
      (req: HttpRequest<any>) =>
        req.headers.has('Authorization') &&
        req.headers.get('Authorization') === `Bearer ${accessToken}`
    );

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    request.flush(testData);
  });

  it(`should not add Authorization to the headers of a request, if accessToken is not available`, () => {
    const testData: Data = {};
    localStorage.clear(); // clear localStorage to make sure that the accessToken is not set

    // Make an HTTP GET request
    httpClient
      .get<Data>(url, { observe: 'response' })
      .subscribe((res: HttpResponse<Data>) =>
        // When observable resolves, result should match test data
        expect(res.body).toBe(testData)
      );

    // Expect one request with no authorization header
    const request: TestRequest = httpTestingController.expectOne(
      (req: HttpRequest<any>) => !req.headers.has('Authorization')
    );

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    request.flush(testData);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
