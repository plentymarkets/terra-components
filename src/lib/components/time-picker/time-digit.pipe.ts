import {
    Pipe,
    PipeTransform
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
    name: 'timeDigit'
})
export class TimeDigitPipe implements PipeTransform
{
    public transform(value:number | string):string
    {
        if(isNullOrUndefined(value))
        {
            return '';
        }
        return value.toString().length === 1
            ? '0' + value
            : value.toString();
    }
}
