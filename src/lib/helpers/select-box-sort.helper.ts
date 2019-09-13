import { isNullOrUndefined } from 'util';

export class SelectBoxSortHelper
{
    public static sortArray(sortingList:Array<any>, sortingKey:string, sortDesc?:boolean):Array<any>
    {
        if(isNullOrUndefined(sortDesc))
        {
            sortDesc = false;
        }

        return sortingList.sort((a:any, b:any) =>
        {
            return SelectBoxSortHelper.internalSort(a, b, sortingKey, sortDesc);
        });
    }

    private static internalSort(a:any, b:any, sortingKey:string, sortDesc:boolean)
    {
        switch(typeof a[sortingKey])
        {
            case 'number':
                return sortDesc ? b[sortingKey] - a[sortingKey] : a[sortingKey] - b[sortingKey];
            case 'string':
                return sortDesc ? b[sortingKey].localeCompare(a[sortingKey]) : a[sortingKey].localeCompare(b[sortingKey]);
        }
    }
}
