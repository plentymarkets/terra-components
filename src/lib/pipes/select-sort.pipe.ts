import {
    Pipe,
    PipeTransform
} from '@angular/core';
import {
    SortDirectionEnum,
    SortHelper
} from '../helpers';

/**
 * @description A pipe for sorting arrays in the template.
 * NOTE: This is a pure pipe. Adding new elements to the array using #push() or removing elements using #splice() will not
 * force the view to be re-rendered.
 */
@Pipe({name: 'selectSort'})
export class SelectSortPipe implements PipeTransform
{
    /**
     * Implementation of the PipeTransform interface.
     * @description Sorts a list of numbers, strings, or objects in a given sorting direction.
     * @param sortingList
     * @param sortDirection
     * @param sortingKey - a string that identifies the property the list of objects should be sorted by
     */
    public transform(sortingList:Array<any>, sortDirection?:SortDirectionEnum, sortingKey?:string):Array<any>
    {
        return SortHelper.sortArray(sortingList, sortDirection, sortingKey);
    }
}
