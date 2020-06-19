import { isNullOrUndefined } from 'util';
import { SortDirection } from '@angular/material/sort';

/**
 * @description Class that provides functionality to sort lists.
 */
export class SortHelper
{
    /**
     * @description Sorts a list of numbers, strings, or objects in a given sorting direction.
     * @param sortingList
     * @param sortDirection
     * @param sortingKey - a string that identifies the property the list of objects should be sorted by
     */
    public static sortArray(sortingList:Array<any>, sortDirection:SortDirection = 'asc', sortingKey?:string):Array<any>
    {
        if(isNullOrUndefined(sortingList))
        {
            return [];
        }

        if(sortDirection === '')
        {
            return sortingList;
        }

        return sortingList.sort((a:any, b:any) =>
        {
            return SortHelper.internalSort(a, b, sortDirection, sortingKey);
        });
    }

    private static internalSort(a:any, b:any, sortDirection:SortDirection, sortingKey:string):number
    {
        switch(typeof a)
        {
            case 'number':
                return sortDirection === 'asc' ? a - b : b - a;
            case 'string':
                return sortDirection === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
            case 'object':
                if(sortingKey === undefined && a.hasOwnProperty('caption'))
                {
                    sortingKey = 'caption';
                }
                return SortHelper.internalSort(a[sortingKey], b[sortingKey], sortDirection, sortingKey);
        }
    }
}
