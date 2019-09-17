import { SelectSortPipe } from './select-sort.pipe';
import { SortHelper } from '../helpers/sort.helper';
import Spy = jasmine.Spy;
import { SortDirectionEnum } from '../helpers/enums/sort-direction.enum';

describe('SelectSortPipe:', () =>
{
    const pipe:SelectSortPipe = new SelectSortPipe();

    it(`should call the SortHelper's #sortArray method and pass on the given arguments`, () =>
    {
        const spy:Spy = spyOn(SortHelper, 'sortArray');
        const list:Array<any> = [];
        const key:string = '';
        const direction:SortDirectionEnum = 'asc';
        pipe.transform(list, direction, key );
        expect(spy).toHaveBeenCalledWith(list, direction, key);
    });
});
