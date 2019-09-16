import {
    Pipe,
    PipeTransform
} from '@angular/core';
import { SelectBoxSortHelper } from '../helpers/select-box-sort.helper';

@Pipe({name: 'selectSort'})
export class SelectSortPipe implements PipeTransform
{
    public transform(sortingList:Array<any>, sortingKey?:string, sortDesc?:boolean):Array<any>
    {
        return SelectBoxSortHelper.sortArray(sortingList, sortingKey, sortDesc);
    }
}
