import {
    Pipe,
    PipeTransform
} from '@angular/core';
import { SortHelper } from '../helpers/sort.helper';
import { SortDirectionEnum } from '../helpers/enums/sort-direction.enum';

/**
 * @description A pipe for sorting arrays in the template.
 * NOTE: This is a pure pipe. Adding new elements to the array using #push() or removing elements using #splice() will not
 * force the view to be re-rendered.
 */
@Pipe({name: 'selectSort'})
export class SelectSortPipe implements PipeTransform
{
    public transform(sortingList:Array<any>, sortDirection?:SortDirectionEnum, sortingKey?:string):Array<any>
    {
        return SortHelper.sortArray(sortingList, sortDirection, sortingKey);
    }
}
