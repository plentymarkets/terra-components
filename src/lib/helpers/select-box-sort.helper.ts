import { isNullOrUndefined } from 'util';

export class SelectBoxSortHelper
{
    public static sortArray(sortingList:Array<any>, sortingKey:string, sortDesc?:boolean):Array<any>
    {
        if(isNullOrUndefined(sortDesc))
        {
            sortDesc = false;
        }

        if(!isNullOrUndefined(sortingList))
        {
            return sortingList.sort((a:any, b:any) =>
            {
                return SelectBoxSortHelper.internalSort(a, b, sortingKey, sortDesc);
            });
        }
        else
        {
            return [];
        }
    }

    private static internalSort(a:any, b:any, sortingKey:string, sortDesc:boolean):any
    {
        switch(typeof a)
        {
            case 'number':
                return sortDesc ? b - a : a - b;
            case 'string':
                return sortDesc ? b.localeCompare(a) : a.localeCompare(b);
            case 'object':
                return SelectBoxSortHelper.internalSort(a[sortingKey], b[sortingKey], sortingKey, sortDesc);
        }
    }
}
