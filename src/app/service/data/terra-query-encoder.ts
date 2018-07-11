import { QueryEncoder } from '@angular/http';

/**
 * @author pweyrich
 * @description Re-implementation of the native QueryEncoder.. It uses javascript's encodeURIComponent-Method to encode query params.
 * Should be useless when using angular's new HttpClient along with HttpParams.
 */
export class TerraQueryEncoder extends QueryEncoder
{
    public encodeKey(k:string):string
    {
        return encodeURIComponent(k);
    }

    public encodeValue(v:string):string
    {
        return encodeURIComponent(v);
    }
}
