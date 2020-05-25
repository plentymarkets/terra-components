import { TableDataSource } from './table-data-source';
import { RequestParameterInterface } from './request-parameter.interface';
import {
    Observable,
    of
} from 'rxjs';
import { TerraFilter } from './filter';
import Spy = jasmine.Spy;

class TestDataSource extends TableDataSource<{}>
{
    public request(requestParams:RequestParameterInterface):Observable<Array<{}>>
    {
        return of(new Array({}));
    }
}

interface FilterParams
{
    id:number;
}

fdescribe('TableDataSource', () =>
{
    let dataSource:TestDataSource;
    let filter:TerraFilter<FilterParams>;

    beforeEach(() =>
    {
        dataSource = new TestDataSource();
        filter = new TerraFilter<FilterParams>();
        dataSource.filter = filter;
    });

    it('should create', () =>
    {
        expect(dataSource).toBeTruthy();
    });

    it('should create an observable for a request', () =>
    {
        expect(dataSource.request({})).toBeTruthy();
    });

    it('should have a filter', () =>
    {
        filter.filterParameter = {id: 1};
        dataSource.filter = filter;

        expect(dataSource.filter).toEqual(filter);
    });

    it('should have data after search', () =>
    {
        dataSource.connect(undefined).subscribe((result:Array<{}>) => expect(result).toBe([]));
    });

    it('data should be refreshes after a request', () =>
    {
        dataSource.request({}).subscribe((result:Array<{}>) =>
        {
            dataSource.data = result;
            expect(dataSource.data).toEqual([{}]);
        });
    });

    it('request should be triggered after search method has been called', () =>
    {
        let spy:Spy = spyOn(dataSource, 'request');

        dataSource.search();

        dataSource.filter.search$.subscribe(() =>
        {
            expect(spy).toHaveBeenCalled();
        });
    });

    // xit('request should be triggered after filter.search has emitted', () =>
    // {
    //    dataSource.data = [{}];
    //
    //    dataSource.filter.search();
    //
    //    expect(dataSource.request({})).toHaveBeenCalled();
    // });

    it('should kill the observables on disconnect', () =>
    {
        dataSource.data = [{id:123}];

        let spy:Spy = spyOn(dataSource, 'request');

        dataSource.disconnect(undefined);

        dataSource.search();

        expect(spy).not.toHaveBeenCalled();
        expect(dataSource.data).toEqual([{id:123}]);
    });
});
