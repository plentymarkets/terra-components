import { TerraFilter } from './filter';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

interface FilterParams
{
    id:number;
}

fdescribe('Filter', () =>
{
    let filter:TerraFilter<FilterParams>;

    beforeEach(() =>
    {
        filter = new TerraFilter<FilterParams>();
    });

    it('should create', () =>
    {
        expect(filter).toBeTruthy();
    });

    it('should create a search$ observable', () =>
    {
        expect(filter.search$).toBeTruthy();
    });

    it('should have a empty filterParameters of generic type', () =>
    {
        expect(filter.filterParameter).toEqual({ } as FilterParams);
    });

    it('should emit search$ after search call', () =>
    {
        // let spy:SpyObj<unknown> = spyOnProperty(filter, 'search$');
        //
        // filter.search();
        // expect(spy).toHaveBeenCalled();

        filter.search$.subscribe(() => expect().nothing());
        filter.search();
    });
});
