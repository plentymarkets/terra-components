/**
 * @author mfrank
 */
import { isNullOrUndefined } from 'util';

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
}
