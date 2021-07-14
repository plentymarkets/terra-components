import { createHttpParams } from './http-params';
import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

describe(`httpParams:`, () => {
    it(`should return empty instance of httpParams if params is null or undefined`, () => {
        let httpParams: HttpParams = createHttpParams(null);
        expect(httpParams).toBeDefined();
        expect(httpParams instanceof HttpParams).toBe(true);
        expect(httpParams.keys().length).toBe(0);
    });

    it(`should return the expected params`, () => {
        let params: Params = {
            type: 'long',
            value: 2
        };
        let httpParams: HttpParams = createHttpParams(params);
        expect(httpParams.keys().length).toBe(2);
        expect(httpParams.has('type')).toBe(true);
        expect(httpParams.has('value')).toBe(true);
    });

    it(`should return httpParams in the form 'list=a,b,c' `, () => {
        const array: Array<string> = ['a', 'b', 'c'];
        let params: Params = {
            type: array
        };
        let httpParams: HttpParams = createHttpParams(params, false);
        expect(httpParams.get('type')).toEqual(array);
    });

    it(`should return httpParams in the form list[]=a&list[]=b&list[]=c' `, () => {
        const array: Array<string> = ['a', 'b', 'c'];
        let params: Params = {
            type: array
        };
        let httpParams: HttpParams = createHttpParams(params, true);
        const values: Array<string> = httpParams.getAll('type[]');
        expect(values).toEqual(array);
    });
});
