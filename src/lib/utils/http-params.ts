import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import {
    isArray,
    isNullOrUndefined
} from 'util';
import { httpParamEncoder } from './http-param-encoder';

/**
 * Creates an instance of HttpParams filled with given #params
 * @param params An Object containing key-value-pairs that should be transferred to HttpParams
 * @param arrayAsArray A switch to change encoding of array-like values.
 *        You can choose between the default 'list=a,b,c' (false) or 'list[]=a&list[]=b&list[]=c' (true) encoding.
 * @returns An instance of HttpParams with the same key-value-pairs as delivered by #params
 */
export function createHttpParams(params:Params, arrayAsArray:boolean = false):HttpParams
{
    let searchParams:HttpParams = new HttpParams({encoder: httpParamEncoder});
    if(isNullOrUndefined(params))
    {
        return searchParams;
    }

    Object.keys(params).forEach((key:string) =>
    {
        if(!isNullOrUndefined(params[key]) && params[key] !== '')
        {
            if(arrayAsArray && isArray(params[key]))
            {
                (params[key] as Array<any>).forEach((arrayItem:any) =>
                {
                    searchParams = searchParams.append(key + '[]', arrayItem.toString());
                });
            }
            else
            {
                searchParams = searchParams.set(key, params[key]);
            }
        }
    });
    return searchParams;
}
