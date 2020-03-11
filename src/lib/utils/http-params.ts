import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import {
    isArray,
    isDate,
    isNullOrUndefined
} from 'util';
import { httpParamEncoder } from './http-param-encoder';
import { isMoment } from 'moment';

import * as _moment from 'moment';
const moment:Function = _moment;

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
                (params[key] as Array<unknown>).forEach((arrayItem:unknown) =>
                {
                    const value:string = getStringValue(arrayItem);
                    searchParams = searchParams.append(key + '[]', value);
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

function getStringValue(value:unknown):string
{
    if(isDate(value))
    {
        return moment(value).toISOString(true);
    }
    if(isMoment(value))
    {
        return value.toISOString(true);
    }
    return value.toString();
}
