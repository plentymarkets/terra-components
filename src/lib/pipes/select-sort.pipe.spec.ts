import { SelectSortPipe } from './select-sort.pipe';
import { SelectBoxSortHelper } from '../helpers/select-box-sort.helper';
import Spy = jasmine.Spy;

describe('SelectSortPipe:', () =>
{
    const pipe:SelectSortPipe = new SelectSortPipe();

    it(`should call the SelectBoxSortHelper's #sortArray method and pass on the given arguments`, () =>
    {
        const spy:Spy = spyOn(SelectBoxSortHelper, 'sortArray');
        const list:Array<any> = [];
        const key:string = '';
        const order:boolean = true;
        pipe.transform(list, key, order);
        expect(spy).toHaveBeenCalledWith(list, key, order);
    });
});
