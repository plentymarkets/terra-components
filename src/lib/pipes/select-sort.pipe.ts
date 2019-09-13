import {
    Pipe,
    PipeTransform
} from '@angular/core';
import { SelectBoxSortHelper } from '../helpers/select-box-sort.helper';

@Pipe({name: 'selectSort'})
export class SelectSortPipe implements PipeTransform
{
    transform(sortingList:Array<any>, sortingKey?:string, sortDesc?:boolean,)
    {
        return SelectBoxSortHelper.sortArray(sortingList, sortingKey);
    }
}
