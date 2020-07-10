import { QueryParamHelper } from '../query-param.helper';
import {
    convertToParamMap,
    ParamMap,
    Params
} from '@angular/router';

describe('QueryParamHelper', () =>
{
    xit('should ', () =>
    {
        // QueryParamHelper.getQueryParamString()
    });

    it('should append params to an url using #getQueryParamString', () =>
    {
        spyOn(QueryParamHelper, 'getQueryParamString');
        const url:string = 'https://www.plentymarkets.eu';
        const params:Params = {page: 1, itemsPerPage: 25};
        const paramMap:ParamMap = convertToParamMap(params);
        QueryParamHelper.appendQueryParamsToUrl(url, paramMap);
        expect(QueryParamHelper.getQueryParamString).toHaveBeenCalledWith(paramMap);
    });
});
