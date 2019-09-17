import { isNullOrUndefined } from 'util';
import { SortDirectionEnum } from './enums/sort-direction.enum';

/**
 * @description Class that provides functionality to sort lists of options for select boxes.
 */
export class SortHelper
{
    public static sortArray(sortingList:Array<any>, sortDirection:SortDirectionEnum = 'asc', sortingKey?:string):Array<any>
    {
        if(isNullOrUndefined(sortingList))
        {
            return [];
        }

        return sortingList.sort((a:any, b:any) =>
        {
            return SortHelper.internalSort(a, b, sortDirection, sortingKey);
        });
    }

    private static internalSort(a:any, b:any, sortDirection:SortDirectionEnum, sortingKey:string):number
    {
        switch(typeof a)
        {
            case 'number':
                return sortDirection === 'asc' ? a - b : b - a;
            case 'string':
                return sortDirection === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
            case 'object':
                return SortHelper.internalSort(a[sortingKey], b[sortingKey], sortDirection, sortingKey);
        }
    }
}
