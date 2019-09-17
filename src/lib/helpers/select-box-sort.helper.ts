import { isNullOrUndefined } from 'util';
import { SortDirectionEnum } from './enums/sort-direction.enum';
import {
    sortNumber,
    sortString,
    sortObject
} from '../utils/sort.utils';

type primitives = 'string' | 'number' | 'object';

function isNumberArray(val:unknown):val is Array<number>
{
    return null;
}

export class SelectBoxSortHelper
{
    public static sortArray(sortingList:Array<any>, sortDirection:SortDirectionEnum = 'asc', sortingKey?:string):Array<any>
    {
        if(isNullOrUndefined(sortingList))
        {
            return [];
        }

        return sortingList.sort((a:any, b:any) =>
        {
            return SelectBoxSortHelper.internalSort(a, b, sortDirection, sortingKey);
        });
    }

    public static sortArrayNew(sortingList:Array<unknown>, sortDirection:SortDirectionEnum = 'asc', sortingKey:string):Array<unknown>
    {
        if(isNullOrUndefined(sortingList))
        {
            return [];
        }

        // Unperformant, aber sicher, das es wirklich immer der gleiche Typ ist

        if(sortingList.every((entry:unknown) => typeof entry === 'number'))
        {
            return sortingList.sort(sortNumber(sortDirection));
        }

        if(sortingList.every((entry:unknown) => typeof entry === 'string'))
        {
            return sortingList.sort(sortString(sortDirection));
        }

        if(sortingList.every((entry:unknown) => typeof entry === 'object'))
        {
            return sortingList.sort((a:Object, b:Object) => sortObject(sortDirection)(a, b, sortingKey));
        }

        return sortingList;

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
                return SelectBoxSortHelper.internalSort(a[sortingKey], b[sortingKey], sortDirection, sortingKey);
        }
    }
}
