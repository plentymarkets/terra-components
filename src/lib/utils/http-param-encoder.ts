import {
    HttpParameterCodec,
    HttpUrlEncodingCodec
} from '@angular/common/http';

export class QueryEncoder extends HttpUrlEncodingCodec
{
    public encodeKey(key:string):string
    {
        return encodeURIComponent(key);
    }

    public encodeValue(value:string):string
    {
        return encodeURIComponent(value);
    }
}

export const terraHttpParamEncoder:HttpParameterCodec = new QueryEncoder();
