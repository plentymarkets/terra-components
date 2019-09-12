import {
    Pipe,
    PipeTransform
} from '@angular/core';
import { Food } from '../../app/app.component';

@Pipe({name: 'matSort'})
export class SortingPipe implements PipeTransform
{
    transform(sortingList:Array<any>, sortingKey:string, sortDesc?:boolean)
    {
        let sortedList = sortingList.sort((a:Food, b:Food) =>
            {
                if(a[sortingKey].toLowerCase() > b[sortingKey].toLowerCase())
                {
                    return 1;
                }

                if(a[sortingKey].toLowerCase() < b[sortingKey].toLowerCase())
                {
                    return -1;
                }

                return 0;
            }
        );

        if(sortDesc)
        {
            sortedList.reverse();
        }

        return sortedList;
    }
}
