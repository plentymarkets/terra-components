import { SortHelper } from '../sort.helper';

describe('SortHelper: ', () =>
{
    it('returns an empty array when input list is undefined', () =>
    {
        const sorted:Array<any> = SortHelper.sortArray(undefined);
        expect(sorted).toEqual([]);
    });

    it('returns an empty array when input list is an empty array', () =>
    {
        const array:Array<any> = [];
        const sorted:Array<any> = SortHelper.sortArray(array);
        expect(sorted).toBe(array);
    });

    it('returns a sorted array when input list are numbers', () =>
    {
        const array:Array<any> = [2, 5, 27, 1, 9];
        const sorted:Array<any> = SortHelper.sortArray(array);
        expect(sorted).toEqual([1, 2, 5, 9, 27]);
        const sorted1:Array<any> = SortHelper.sortArray(array, 'desc');
        expect(sorted1).toEqual([27, 9, 5, 2, 1]);
    });

    it('returns a sorted array when input list are strings', () =>
    {
        const array:Array<any> = ['a', 'z', 'b', 'j', 'y'];
        const sorted:Array<any> = SortHelper.sortArray(array);
        expect(sorted).toEqual(['a', 'b', 'j', 'y', 'z']);
        const sorted1:Array<any> = SortHelper.sortArray(array, 'desc');
        expect(sorted1).toEqual(['z', 'y', 'j', 'b', 'a']);
    });

    describe('list of objects', () =>
    {
        const object1:{ property:string } = {property: 'Ciao'};
        const object2:{ property:string } = {property: 'Hallo'};
        const object3:{ property:string } = {property: 'Zone'};

        it('returns a sorted array when input list contains objects', () =>
        {
            const list:Array<any> = [object2, object1, object3];
            const sorted:Array<any> = SortHelper.sortArray(list, 'asc', 'property');
            expect(sorted).toEqual([object1, object2, object3]);
            const sorted1:Array<any> = SortHelper.sortArray(list, 'desc', 'property');
            expect(sorted1).toEqual([object3, object2, object1]);
        });

        it('does not return a sorted array when input list contains objects and no sortingKey is given', () =>
        {
            const list:Array<any> = [object2, object1, object3];
            const sorted:Array<any> = SortHelper.sortArray(list);
            expect(sorted).toEqual([object2, object1, object3]);
        });
    });
});
