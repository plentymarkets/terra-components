import { createHttpParams } from './http-params';
import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { httpParamEncoder } from './http-param-encoder';

describe(`httpParams Encoder:`, () => {
    it(`should return a encoded key`, () => {
        const key = '/encode/this key';
        expect(httpParamEncoder.encodeKey(key)).toBe('%2Fencode%2Fthis%20key');
    });
    it(`should return a encoded value`, () => {
        const key = '/encode/this value';
        expect(httpParamEncoder.encodeValue(key)).toBe('%2Fencode%2Fthis%20value');
    });
});
