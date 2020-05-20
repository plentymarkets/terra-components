import { TerraFilter } from './filter';

interface FilterParams
{
    id:number;
}

describe('Filter', () =>
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
        spyOn(filter.search$, 'next');
        filter.search();
        expect(filter.search$.next).toHaveBeenCalled();
    });
});
