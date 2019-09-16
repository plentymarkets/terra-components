import { isNullOrUndefined } from 'util';
import { SortDirectionEnum } from './enums/sort-direction.enum';

export class SelectBoxSortHelper
{
    public static sortArray(sortingList:Array<any>, sortDesc:SortDirectionEnum = 'asc', sortingKey?:string):Array<any>
    {
        if(isNullOrUndefined(sortingList))
        {
            return [];
        }

        return sortingList.sort((a:any, b:any) =>
        {
            return SelectBoxSortHelper.internalSort(a, b, sortDesc, sortingKey);
        });
    }

    private static internalSort(a:any, b:any, sortDesc:SortDirectionEnum, sortingKey:string):any
    {
        switch(typeof a)
        {
            case 'number':
                return sortDesc === 'asc' ? a - b : b - a;
            case 'string':
                return sortDesc === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
            case 'object':
                return SelectBoxSortHelper.internalSort(a[sortingKey], b[sortingKey], sortDesc, sortingKey);
        }
    }
}
