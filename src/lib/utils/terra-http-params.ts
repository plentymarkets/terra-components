import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import {
    isArray,
    isNullOrUndefined
} from 'util';

export function createHttpParams(params:Params, arrayAsArray:boolean = false):HttpParams
{
    if(isNullOrUndefined(params))
    {
        return new HttpParams(); // return empty HttpParams
    }

    let searchParams:HttpParams = new HttpParams();
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
