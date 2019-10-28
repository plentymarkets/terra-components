import { isNullOrUndefined } from 'util';
import * as cloneDeep from 'lodash.clonedeep';

export class ObjectHelper
{
    public static removeBlankAttributesFromObject(obj:Object):void
    {
        Object.keys(obj).forEach((key:string) =>
        {
            if(isNullOrUndefined(obj[key]))
            {
                delete obj[key];
            }
        });
    }

    public static cloneDeep(obj:Object):Object
    {
        return cloneDeep(obj);
    }
}
