import { ParamMap } from '@angular/router';
import { StringHelper } from './string.helper';

// @dynamic
export class QueryParamHelper {
    public static getQueryParamString(paramMap: ParamMap): string {
        return paramMap.keys.map((param: string) => param + '=' + encodeURIComponent(paramMap.get(param))).join('&');
    }

    public static appendQueryParamsToUrl(url: string, paramMap: ParamMap): string {
        let paramString: string = this.getQueryParamString(paramMap);

        return StringHelper.isNullUndefinedOrEmpty(paramString) ? url : url + '?' + paramString;
    }
}
