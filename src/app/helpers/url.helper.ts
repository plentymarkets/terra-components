import { URLSearchParams } from '@angular/http';
import { TerraBaseParameterInterface } from '../..';
import {
    isArray,
    isNullOrUndefined
} from 'util';
import { TerraQueryEncoder } from '../service/data/terra-query-encoder';

export class UrlHelper
{
    public static removeLeadingSlash(url:string):string
    {
        if(url.startsWith('/'))
        {
            // remove leading slash in url
            return url.slice(1, url.length);
        }

        return url;
    }

    public static removeFragment(url:string):string
    {
        if(url.includes('#'))
        {
            return url.slice(0, url.indexOf('#'));
        }

        return url;
    }

    public static removeQueryParams(url:string):string
    {
        if(url.includes('?'))
        {
            return url.includes('#') ? url.replace(url.slice(url.indexOf('?'), url.indexOf('#')), '') : url.slice(0, url.indexOf('?'));
        }

        return url;
    }

    public static getCleanUrl(url:string):string
    {
        return this.removeFragment(this.removeQueryParams(this.removeLeadingSlash(url)));
    }

    /**
     * @param {TerraBaseParameterInterface} params
     * @param {boolean} arrayAsArray - Defines if an array search param should interpret and parsed as an array or not. Default is false.
     * @returns {URLSearchParams}
     */
    public static createUrlSearchParams(params:TerraBaseParameterInterface, arrayAsArray:boolean = false):URLSearchParams
    {
        let searchParams:URLSearchParams = new URLSearchParams('', new TerraQueryEncoder());

        if(!isNullOrUndefined(params))
        {
            Object.keys(params).forEach((key:string) =>
            {
                if(!isNullOrUndefined(params[key]) && params[key] !== '')
                {
                    if(arrayAsArray && isArray(params[key]))
                    {
                        searchParams.appendAll(this.createArraySearchParams(key, params[key]));
                    }
                    else
                    {
                        searchParams.set(key, params[key]);
                    }
                }

            });
        }

        return searchParams;
    }

    private static createArraySearchParams(key:string, params:Array<string>):URLSearchParams
    {
        let arraySearchParams:URLSearchParams = new URLSearchParams();

        params.forEach((param:string) =>
        {
            arraySearchParams.append(key + '[]', param);
        });

        return arraySearchParams;
    }
}
