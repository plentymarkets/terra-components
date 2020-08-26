import { SelectSortPipe } from './select-sort.pipe';
import { SortHelper } from '../helpers/sort.helper';
import { SortDirection } from '@angular/material/sort';

describe('SelectSortPipe:', () => {
    const pipe: SelectSortPipe = new SelectSortPipe();

    it(`should call the SortHelper's #sortArray method and pass on the given arguments`, () => {
        spyOn(SortHelper, 'sortArray');
        const list: Array<any> = [];
        const key: string = '';
        const direction: SortDirection = 'asc';
        pipe.transform(list, direction, key);
        expect(SortHelper.sortArray).toHaveBeenCalledWith(list, direction, key);
    });
});
