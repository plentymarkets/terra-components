import { isNullOrUndefined } from "../public-api";

export class StringHelper
{
    public static isNullUndefinedOrEmpty(str:string):boolean
    {
        return isNullOrUndefined(str) || str.length === 0;
    }
}
