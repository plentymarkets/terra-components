import { isNullOrUndefined } from '../helpers/null-checker';

export class StringHelper
{
    public static isNullUndefinedOrEmpty(str:string):boolean
    {
        return isNullOrUndefined(str) || str.length === 0;
    }
}
