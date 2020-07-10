import { QueryParamHelper } from '../query-param.helper';
import {
    convertToParamMap,
    ParamMap,
    Params
} from '@angular/router';


describe('QueryParamHelper', () =>
{
    // Shortcut function to create a queryParam string with the QueryParamHelper out of a Params object.
    const getQueryParamString:Function = (params:Params):string => QueryParamHelper.getQueryParamString(convertToParamMap(params));
    const specialChars:Array<string> = ['!', '"', '§', '$', '%', '&', '/', '(', ')', '=', '?', '`', '´', '+', '*', '#', '-', '_', '.', ':', ',', ';', '~'];

    it('should separate multiple params with ampersand (&)', () =>
    {
       const paramMap:ParamMap = convertToParamMap({a: 1, b: 2, c: 3});
       const queryParamString:string = QueryParamHelper.getQueryParamString(paramMap);
       expect(queryParamString.split('&').length).toBe(paramMap.keys.length);
    });
    it('should properly encode special characters', () =>
    {
        specialChars.forEach((char:string) =>
        {
            const encodedChar:string = encodeURIComponent(char);
            expect(getQueryParamString({a: char})).toBe('a=' + encodedChar);
        });
    });

    // TODO: make this one succeed
    xit(`should also encode special characters in a param's key`, () =>
    {
        specialChars.forEach((char:string) =>
        {
            const encodedChar:string = encodeURIComponent(char);
            expect(getQueryParamString({[char]: 1})).toBe(encodedChar + '=1');
        });
    });

    it('should append params to an url using #getQueryParamString', () =>
    {
        spyOn(QueryParamHelper, 'getQueryParamString').and.callThrough();
        const url:string = 'https://www.plentymarkets.eu';
        const params:Params = {page: 1, itemsPerPage: 25};
        const paramMap:ParamMap = convertToParamMap(params);
        const urlWithParams:string = QueryParamHelper.appendQueryParamsToUrl(url, paramMap);
        expect(QueryParamHelper.getQueryParamString).toHaveBeenCalledWith(paramMap);
        expect(urlWithParams).toBe(url + '?' + QueryParamHelper.getQueryParamString(paramMap));
    });

    it('should return the unmodified url if paramMap is empty', () =>
    {
        const paramMap:ParamMap = convertToParamMap({});
        const url:string = 'https://www.plentymarkets.eu';
        const urlWithParams:string = QueryParamHelper.appendQueryParamsToUrl(url, paramMap);
        expect(urlWithParams).toBe(url);
    });
});
