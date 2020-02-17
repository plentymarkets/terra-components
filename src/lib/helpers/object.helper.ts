import { isNullOrUndefined } from 'util';
import * as cloneDeep_ from 'lodash.clonedeep';

const cloneDeep:(val:Object) => Object = cloneDeep_;

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
