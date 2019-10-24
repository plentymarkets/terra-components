import {
    HttpParams,
    HttpUrlEncodingCodec
} from '@angular/common/http';
import {
    isArray,
    isNullOrUndefined
} from "util";
import { TerraKeyValueInterface } from '../models';

export function createHttpParams(params:TerraKeyValueInterface<any>, arrayAsArray:boolean = false):HttpParams
{
    let searchParams:HttpParams = new HttpParams({encoder: new HttpUrlEncodingCodec()});

    if(!isNullOrUndefined(params))
    {
        Object.keys(params).forEach((key:string) =>
        {
            if(!isNullOrUndefined(params[key]) && params[key] !== '')
            {
                if(arrayAsArray && isArray(params[key]))
                {
                    (<[]> params[key]).forEach((arrayItem:string) =>
                    {
                        searchParams = searchParams.append(key + '[]', arrayItem);
                    });
                }
                else
                {
                    searchParams = searchParams.set(key, params[key]);
                }
            }

        });
    }

    return searchParams;
}
