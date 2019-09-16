import {
    Pipe,
    PipeTransform
} from '@angular/core';
import { SelectBoxSortHelper } from '../helpers/select-box-sort.helper';
import { SortDirectionEnum } from '../helpers/enums/sort-direction.enum';

@Pipe({name: 'selectSort'})
export class SelectSortPipe implements PipeTransform
{
    public transform(sortingList:Array<any>, sortDirection?:SortDirectionEnum, sortingKey?:string):Array<any>
    {
        return SelectBoxSortHelper.sortArray(sortingList, sortDirection, sortingKey);
    }
}
