import { HttpParams } from '@angular/common/http';
import {
    isArray,
    isNullOrUndefined
} from 'util';
import { TerraKeyValueInterface } from '../models';

export function createHttpParams(params:TerraKeyValueInterface<any>, arrayAsArray:boolean = false):HttpParams
{
    let searchParams:HttpParams = new HttpParams();

    if(!isNullOrUndefined(params))
    {
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
    }

    return searchParams;
}
